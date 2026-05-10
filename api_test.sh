#!/bin/bash

API_KEY="AIzaSyBpxzYLggbhSZuPbpSGVdJ1YCOiKUAVfco"
MODELS=("gemini-3.1-flash-live-preview" "gemini-2.5-flash-native-audio-latest" "gemini-1.5-flash" "gemini-1.5-pro")

echo "--- Gemini API Model Test (2026) ---"

for MODEL in "${MODELS[@]}"; do
    echo "Testing $MODEL..."
    # Note: Some models might require bidiGenerateContent or different endpoints, 
    # but we'll try generateContent first as it's the standard.
    RESPONSE=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}" \
        -H 'Content-Type: application/json' \
        -d '{
          "contents": [{
            "parts":[{"text": "Say hello from Gemini!"}]
          }]
        }')
    
    if [[ $RESPONSE == *"text"* ]]; then
        TEXT=$(echo "$RESPONSE" | grep -o '"text": "[^"]*' | head -1 | cut -d'"' -f4)
        echo "✅ $MODEL: Success! Response: $TEXT"
    elif [[ $RESPONSE == *"API_KEY_INVALID"* ]]; then
        echo "❌ $MODEL: Invalid API Key."
        break
    else
        MESSAGE=$(echo "$RESPONSE" | grep -o '"message": "[^"]*' | head -1 | cut -d'"' -f4)
        echo "❌ $MODEL: Failed. ($MESSAGE)"
    fi
    echo "---------------------------"
done
