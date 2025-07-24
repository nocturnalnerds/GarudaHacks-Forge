from transformers import VitsModel, AutoTokenizer
import torch

model = VitsModel.from_pretrained("./saved_model/sunda")
tokenizer = AutoTokenizer.from_pretrained("./saved_model/sunda")

text = "Wilujeng enjing, kumaha damang?"
inputs = tokenizer(text, return_tensors="pt")

with torch.no_grad():
    output = model(**inputs).waveform


import scipy.io.wavfile
scipy.io.wavfile.write("techno.wav", rate=model.config.sampling_rate, data=output.T.float().numpy())

# model.save_pretrained("./saved_model/makasar")
# tokenizer.save_pretrained("./saved_model/makasar")
