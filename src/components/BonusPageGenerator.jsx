import { useState } from 'react';

const templates = [
  { 
    id: 'template1', 
    name: 'Software Product Bonus', 
    description: 'Perfect for software, SaaS, and digital product offers',
    preview: '/templates/software-preview.jpg'
  },
  { 
    id: 'template2', 
    name: 'Course & Training Bonus', 
    description: 'Ideal for online courses, coaching programs, and training',
    preview: '/templates/course-preview.jpg'
  },
  { 
    id: 'template3', 
    name: 'Ecommerce Bonus', 
    description: 'Great for physical products and ecommerce offers',
    preview: '/templates/ecommerce-preview.jpg'
  }
];

export default function BonusPageGenerator() {
  const [affiliateLink, setAffiliateLink] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [bonusTitle, setBonusTitle] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [error, setError] = useState('');
  
  const validateJVZooLink = (link) => {
    // Basic validation - check if it contains jvzoo.com and has some parameters
    return link.includes('jvzoo.com') && link.includes('?');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset error and generated URL
    setError('');
    setGeneratedUrl('');
    
    // Validate inputs
    if (!affiliateLink) {
      setError('Please enter your JVZoo affiliate link');
      return;
    }
    
    if (!validateJVZooLink(affiliateLink)) {
      setError('Please enter a valid JVZoo affiliate link');
      return;
    }
    
    if (!selectedTemplate) {
      setError('Please select a template');
      return;
    }
    
    if (!bonusTitle) {
      setError('Please enter a title for your bonus page');
      return;
    }
    
    // Generate the URL with parameters
    const baseUrl = window.location.origin;
    const encodedLink = encodeURIComponent(affiliateLink);
    const encodedTitle = encodeURIComponent(bonusTitle);
    
    const generatedLink = `${baseUrl}/bonus/${selectedTemplate}?link=${encodedLink}&title=${encodedTitle}`;
    setGeneratedUrl(generatedLink);
  };
  
  return (
    <div className="generator-container">
      <h1>Affiliate Bonus Page Generator</h1>
      <p className="intro">Create a custom bonus page for your JVZoo affiliate promotions in seconds!</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="affiliateLink">Your JVZoo Affiliate Link:</label>
          <input
            type="url"
            id="affiliateLink"
            value={affiliateLink}
            onChange={(e) => setAffiliateLink(e.target.value)}
            placeholder="https://www.jvzoo.com/..."
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="bonusTitle">Bonus Page Title:</label>
          <input
            type="text"
            id="bonusTitle"
            value={bonusTitle}
            onChange={(e) => setBonusTitle(e.target.value)}
            placeholder="e.g., Exclusive Bonuses for Product X"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label>Select Template:</label>
          <div className="template-grid">
            {templates.map(template => (
              <div 
                key={template.id}
                className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="template-preview">
                  <div className="preview-placeholder">{template.name}</div>
                </div>
                <div className="template-info">
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit" className="generate-button">Generate Bonus Page</button>
      </form>
      
      {generatedUrl && (
        <div className="result-container">
          <h2>Your Bonus Page is Ready!</h2>
          <p>Share this link with your audience:</p>
          <div className="url-display">
            <input
              type="text"
              readOnly
              value={generatedUrl}
              className="form-control"
            />
            <button 
              className="copy-button"
              onClick={() => {
                navigator.clipboard.writeText(generatedUrl);
                alert('URL copied to clipboard!');
              }}
            >
              Copy
            </button>
          </div>
          <div className="preview-link">
            <a href={generatedUrl} target="_blank" rel="noopener noreferrer">
              Preview Your Bonus Page
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
