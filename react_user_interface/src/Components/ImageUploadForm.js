import React, { useState } from 'react';

function ImageUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      setUploadStatus('Envoi en cours...');
      await uploadImage(formData);
    } else {
      setUploadStatus('Veuillez sélectionner un fichier à envoyer.');
    }
  };

  const uploadImage = async (formData) => {
    try {
      const response = await fetch('http://localhost:65253/predict', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setUploadStatus(`Upload réussi: ${data.predictedLabel}`);
      } else {
        setUploadStatus('Erreur lors de l\'envoi du fichier.');
      }
    } catch (error) {
      setUploadStatus(`Erreur lors de l'envoi du fichier: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Upload image:
          <input type="file" accept="image/*" onChange={handleFileInput} />
        </label>
        <button type="submit">Envoyer</button>
      </form>
      {uploadStatus && <div>{uploadStatus}</div>}
    </div>
  );
}

export default ImageUploadForm;
