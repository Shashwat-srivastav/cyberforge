# FuzzForge AI Model Tester
# Tests multiple OpenRouter models and reports which ones work

$API_KEY = "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"
$API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Models to test
$MODELS = @(
    "nvidia/nemotron-nano-9b-v2:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
    "deepseek/deepseek-chat",
    "deepseek/deepseek-r1",
    "deepseek/deepseek-r1:nitro",
    "deepseek/deepseek-chat-v3.1",
    "deepseek/deepseek-r1-0528",
    "qwen/qwen-2.5-coder-32b-instruct",
    "qwen/qwen3-coder",
    "google/gemini-2.0-flash-exp:free",
    "google/gemini-flash-1.5"
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  FUZZFORGE MODEL COMPATIBILITY TESTER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nTesting $($MODELS.Count) models...`n" -ForegroundColor Yellow

$results = @()

foreach ($model in $MODELS) {
    Write-Host "Testing: $model" -ForegroundColor Cyan -NoNewline
    
    $testBody = @{
        model = $model
        messages = @(
            @{
                role = "system"
                content = "Return ONLY valid JSON: {`"status`":`"working`"}"
            }
            @{
                role = "user"
                content = "Test"
            }
        )
    } | ConvertTo-Json -Depth 10
    
    try {
        $response = Invoke-RestMethod -Uri $API_URL `
            -Method Post `
            -Headers @{
                "Content-Type" = "application/json"
                "Authorization" = "Bearer $API_KEY"
            } `
            -Body $testBody `
            -TimeoutSec 20 `
            -ErrorAction Stop
        
        if ($response.choices -and $response.choices[0].message.content) {
            $content = $response.choices[0].message.content
            
            try {
                $cleaned = $content -replace '```json', '' -replace '```', '' -replace '^\s+', '' -replace '\s+$', ''
                $null = $cleaned | ConvertFrom-Json
                
                Write-Host " [OK]" -ForegroundColor Green
                Write-Host "  Length: $($content.Length) chars" -ForegroundColor Gray
                
                if ($content -match '```') {
                    Write-Host "  Warning: Uses markdown wrapping" -ForegroundColor Yellow
                }
                
                $results += [PSCustomObject]@{
                    Model = $model
                    Status = "WORKING"
                    Error = ""
                }
            }
            catch {
                Write-Host " [PARTIAL - Invalid JSON]" -ForegroundColor Yellow
                $results += [PSCustomObject]@{
                    Model = $model
                    Status = "PARTIAL"
                    Error = "Invalid JSON"
                }
            }
        }
        else {
            Write-Host " [FAILED - Empty response]" -ForegroundColor Red
            $results += [PSCustomObject]@{
                Model = $model
                Status = "FAILED"
                Error = "Empty response"
            }
        }
    }
    catch {
        $errorMsg = $_.Exception.Message
        
        if ($errorMsg -match "404") {
            Write-Host " [NOT AVAILABLE - 404]" -ForegroundColor Red
            $errorType = "404 Not Available"
        }
        elseif ($errorMsg -match "401") {
            Write-Host " [UNAUTHORIZED - 401]" -ForegroundColor Red
            $errorType = "401 Unauthorized"
        }
        elseif ($errorMsg -match "402") {
            Write-Host " [PAYMENT REQUIRED - 402]" -ForegroundColor Red
            $errorType = "402 Payment Required"
        }
        elseif ($errorMsg -match "429") {
            Write-Host " [RATE LIMITED - 429]" -ForegroundColor Red
            $errorType = "429 Rate Limited"
        }
        elseif ($errorMsg -match "timeout") {
            Write-Host " [TIMEOUT]" -ForegroundColor Yellow
            $errorType = "Timeout"
        }
        else {
            Write-Host " [ERROR]" -ForegroundColor Red
            $errorType = "Unknown Error"
        }
        
        $results += [PSCustomObject]@{
            Model = $model
            Status = "FAILED"
            Error = $errorType
        }
    }
    
    Start-Sleep -Milliseconds 500
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  SUMMARY REPORT" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$results | Format-Table -AutoSize

$working = ($results | Where-Object { $_.Status -eq "WORKING" }).Count
$partial = ($results | Where-Object { $_.Status -eq "PARTIAL" }).Count
$failed = ($results | Where-Object { $_.Status -eq "FAILED" }).Count

Write-Host "`nStatistics:" -ForegroundColor Yellow
Write-Host "  Working: $working / $($MODELS.Count)" -ForegroundColor Green
Write-Host "  Partial: $partial / $($MODELS.Count)" -ForegroundColor Yellow
Write-Host "  Failed: $failed / $($MODELS.Count)" -ForegroundColor Red

# Working models
$workingModels = $results | Where-Object { $_.Status -eq "WORKING" }

if ($workingModels.Count -gt 0) {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "  WORKING MODELS (Ready to use)" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    
    foreach ($model in $workingModels) {
        Write-Host "  [OK] $($model.Model)" -ForegroundColor Green
    }
}

# DeepSeek analysis
$deepseekModels = $results | Where-Object { $_.Model -match "deepseek" }
$deepseekWorking = $deepseekModels | Where-Object { $_.Status -eq "WORKING" }

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  DEEPSEEK MODEL ANALYSIS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($deepseekWorking.Count -gt 0) {
    Write-Host "`nDeepSeek models that work:" -ForegroundColor Green
    foreach ($model in $deepseekWorking) {
        Write-Host "  [OK] $($model.Model)" -ForegroundColor Green
    }
}
else {
    Write-Host "`n[X] ALL DEEPSEEK MODELS FAILED" -ForegroundColor Red
    Write-Host "`nWhy DeepSeek doesn't work:" -ForegroundColor Yellow
    Write-Host "  1. Data Policy Restrictions" -ForegroundColor White
    Write-Host "     - DeepSeek blocks security/code analysis requests" -ForegroundColor Gray
    Write-Host "     - Content filters reject vulnerability scanning" -ForegroundColor Gray
    
    Write-Host "`n  2. Privacy Settings" -ForegroundColor White
    Write-Host "     - Go to: https://openrouter.ai/settings/privacy" -ForegroundColor Gray
    Write-Host "     - Enable ALL privacy options" -ForegroundColor Gray
    Write-Host "     - May still not work due to policy blocks" -ForegroundColor Gray
    
    Write-Host "`n  3. Free Tier Limitations" -ForegroundColor White
    Write-Host "     - Some DeepSeek variants require paid credits" -ForegroundColor Gray
    Write-Host "     - Check: https://openrouter.ai/models" -ForegroundColor Gray
    
    Write-Host "`nHOW TO MAKE DEEPSEEK WORK:" -ForegroundColor Yellow
    Write-Host "  Option A: Change Prompt Strategy" -ForegroundColor Cyan
    Write-Host "     - Remove words: security, vulnerability, attack" -ForegroundColor Gray
    Write-Host "     - Use: code quality, code review, best practices" -ForegroundColor Gray
    
    Write-Host "`n  Option B: Use Paid Credits" -ForegroundColor Cyan
    Write-Host "     - Add credits: https://openrouter.ai/credits" -ForegroundColor Gray
    Write-Host "     - Some models only work with payment" -ForegroundColor Gray
    
    Write-Host "`n  Option C: Use Alternative Models (RECOMMENDED)" -ForegroundColor Cyan
    Write-Host "     - NVIDIA Nemotron: Similar quality, works free" -ForegroundColor Gray
    Write-Host "     - Mistral 7B: Good JSON, reliable" -ForegroundColor Gray
    Write-Host "     - Meta Llama 3.2: Fast and consistent" -ForegroundColor Gray
    
    Write-Host "`nDeepSeek Error Details:" -ForegroundColor Yellow
    foreach ($model in $deepseekModels) {
        Write-Host "  $($model.Model): $($model.Error)" -ForegroundColor Gray
    }
}

# Next steps
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($workingModels.Count -gt 0) {
    $firstWorking = $workingModels[0].Model
    
    Write-Host "`nYou have $($workingModels.Count) working model(s)!" -ForegroundColor Green
    Write-Host "`nTo use in your project:" -ForegroundColor Yellow
    Write-Host "  1. Open: services/geminiService.ts" -ForegroundColor White
    Write-Host "  2. Change line 7 to:" -ForegroundColor White
    Write-Host "     const MODEL = `"$firstWorking`";" -ForegroundColor Cyan
    Write-Host "  3. Refresh browser: Ctrl + Shift + R" -ForegroundColor White
    Write-Host "  4. Test your demo!`n" -ForegroundColor White
}
else {
    Write-Host "`n[X] No working models found!" -ForegroundColor Red
    Write-Host "`nTroubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Check API key is valid" -ForegroundColor White
    Write-Host "  2. Verify internet connection" -ForegroundColor White
    Write-Host "  3. Check: https://status.openrouter.ai" -ForegroundColor White
    Write-Host "  4. Try adding credits: https://openrouter.ai/credits`n" -ForegroundColor White
}
