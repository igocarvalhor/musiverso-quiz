$results = @()

$tests = @(
    @{
        name = "Dominante vs Subdominante (FACIL)"
        payload = '{"resposta_usuario":"Dominante","resposta_correta":"Subdominante","subtema":"funcao","nivel":"facil"}'
    },
    @{
        name = "Dominante vs Subdominante (DIFICIL)"
        payload = '{"resposta_usuario":"Dominante","resposta_correta":"Subdominante","subtema":"funcao","nivel":"dificil"}'
    },
    @{
        name = "Tonica Relativa vs Tonica (MEDIO)"
        payload = '{"resposta_usuario":"Tonica relativa","resposta_correta":"Tonica","subtema":"funcao","nivel":"medio"}'
    }
)

foreach($test in $tests) {
    try {
        $result = Invoke-RestMethod 'https://musiverso-quiz.vercel.app/api/v1/corrigir-resposta' -Method Post -ContentType 'application/json' -Body $test.payload
        Write-Host "=== $($test.name) ===" -ForegroundColor Green
        Write-Host "Padrao: $($result.padrao)"
        Write-Host "Explicacao:"
        Write-Host $result.explicacao
        Write-Host ""
    } catch {
        Write-Host "ERRO: $($_.Exception.Message)" -ForegroundColor Red
    }
}
