from flask import Flask, jsonify,request, send_file
from flask_cors import CORS
from transformers import VitsModel, AutoTokenizer
from enum import Enum
import torch
import io
import scipy.io.wavfile

app = Flask(__name__)

class LanguageModel(Enum):
    BALI = ("bali", "./saved_model/bali")
    JAVA = ("java", "./saved_model/java")
    MADURA = ("madura", "./saved_model/madura")
    MAKASAR = ("makasar", "./saved_model/makasar")
    SUNDA = ("sunda", "./saved_model/sunda")

    def __init__(self, lang_name, model_path):
        self.lang_name = lang_name
        self.model_path = model_path

    @staticmethod
    def get_by_lang(lang):
        for lm in LanguageModel:
            if lm.lang_name == lang:
                return lm
        return None


bali = LanguageModel.BALI
java = LanguageModel.JAVA
madura = LanguageModel.MADURA
makasar = LanguageModel.MAKASAR
sunda = LanguageModel.SUNDA

CORS(app)

@app.route('/TTS', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    lang = data.get('lang')
    text = data.get('text')

    lm = LanguageModel.get_by_lang(lang)
    if not lm:
        return jsonify({"error": f"Language '{lang}' not supported"}), 400
    
    if not lang or not text:
        return jsonify({"error": "Missing 'lang' or 'text' in request body"}), 400
    
    model = VitsModel.from_pretrained(lm.model_path)
    tokenizer = AutoTokenizer.from_pretrained(lm.model_path)
    inputs = tokenizer(text, return_tensors="pt")
    
    with torch.no_grad():
        output = model(**inputs).waveform
    
    buf = io.BytesIO()
    scipy.io.wavfile.write(buf, rate=model.config.sampling_rate, data=output.T.float().numpy())
    buf.seek(0)

    return send_file(
        buf,
        mimetype="audio/wav",
        as_attachment=True,
        download_name="output.wav"
    )

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Flask API!"})

if __name__ == '__main__':
    app.run(debug=True)