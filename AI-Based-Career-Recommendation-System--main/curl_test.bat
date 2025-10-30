@echo off
echo Testing API with curl...
curl -X POST http://localhost:5000/predict ^
     -H "Content-Type: application/json" ^
     -d "{\"name\":\"Test User\",\"age\":25,\"education\":\"Bachelor's\",\"skills\":[\"Python\"],\"interests\":[\"Technology\"]}" ^
     --connect-timeout 10 ^
     --max-time 30
echo.
echo Test completed!