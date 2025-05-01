import { useState, useRef } from 'react';

const templates = [
  { 
    id: 'template1', 
    name: 'Software Product Bonus', 
    description: 'Perfect for software, SaaS, and digital product offers',
    preview: '/templates/software-template.jpg'
  },
  { 
    id: 'template2', 
    name: 'Course & Training Bonus', 
    description: 'Ideal for online courses, coaching programs, and training',
    preview: '/templates/course-template.jpg'
  },
  { 
    id: 'template3', 
    name: 'Ecommerce Bonus', 
    description: 'Great for physical products and ecommerce offers',
    preview: '/templates/ecommerce-template.jpg'
  },
  { 
    id: 'template4', 
    name: 'Digital Download Bonus', 
    description: 'Perfect for ebooks, PDFs, and digital downloads',
    preview: '/templates/digital-template.jpg'
  },
  { 
    id: 'template5', 
    name: 'Membership Site Bonus', 
    description: 'Ideal for recurring membership and subscription offers',
    preview: '/templates/membership-template.jpg'
  }
];

export default function BonusPageGenerator() {
  const [affiliateLink, setAffiliateLink] = useState('');
  const [affiliateName, setAffiliateName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [bonusTitle, setBonusTitle] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const fileInputRef = useRef(null);
  
  const validateJVZooLink = (link) => {
    // Updated validation to accept various JVZoo domain formats
    return (
      (link.includes('jvzoo.com') || 
       link.includes('jvz1.com') || 
       link.includes('jvz2.com') || 
       link.includes('jvz3.com') || 
       link.includes('jvz4.com') || 
       link.includes('jvz5.com') || 
       link.includes('jvz6.com') || 
       link.includes('jvz7.com') || 
       link.includes('jvz8.com') || 
       link.includes('jvz9.com') || 
       link.includes('jvz10.com')) && 
      (link.includes('/c/') || link.includes('?'))
    );
  };
  
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError('Profile image must be less than 2MB');
        return;
      }
      
      // Check file type
      if (!file.type.match('image.*')) {
        setError('Please select an image file');
        return;
      }
      
      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
    const encodedName = encodeURIComponent(affiliateName || 'Affiliate');
    
    // For profile image, we'd normally upload it to a server and get a URL
    // For this demo, we'll just indicate if an image was selected
    const hasProfileImage = profileImage ? '&hasImage=true' : '';
    
    const generatedLink = `${baseUrl}/bonus/${selectedTemplate}?link=${encodedLink}&title=${encodedTitle}&name=${encodedName}${hasProfileImage}`;
    setGeneratedUrl(generatedLink);
  };
  
  return (
    <div className="generator-container">
      <div className="generator-header">
        <h1>Affiliate Bonus Page Generator</h1>
        <p className="intro">Create professional bonus pages for your JVZoo affiliate promotions in seconds!</p>
      </div>
      
      {error && (
        <div className="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="generator-form">
        <div className="form-columns">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="affiliateLink">
                <span className="label-text">Your JVZoo Affiliate Link</span>
                <span className="required">*</span>
              </label>
              <input
                type="url"
                id="affiliateLink"
                value={affiliateLink}
                onChange={(e) => setAffiliateLink(e.target.value)}
                placeholder="https://jvz3.com/c/123456/789012"
                className="form-control"
                required
              />
              <p className="help-text">Enter your full JVZoo affiliate link (e.g., https://jvz3.com/c/123456/789012)</p>
            </div>
            
            <div className="form-group">
              <label htmlFor="bonusTitle">
                <span className="label-text">Bonus Page Title</span>
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="bonusTitle"
                value={bonusTitle}
                onChange={(e) => setBonusTitle(e.target.value)}
                placeholder="e.g., Exclusive Bonuses for Product X"
                className="form-control"
                required
              />
              <p className="help-text">This will be the main headline on your bonus page</p>
            </div>
            
            <div className="form-group">
              <label htmlFor="affiliateName">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                id="affiliateName"
                value={affiliateName}
                onChange={(e) => setAffiliateName(e.target.value)}
                placeholder="e.g., John Smith"
                className="form-control"
              />
              <p className="help-text">Your name will be displayed on the bonus page</p>
            </div>
          </div>
          
          <div className="form-column">
            <div className="form-group profile-image-group">
              <label>
                <span className="label-text">Your Profile Picture</span>
              </label>
              <div className="profile-image-container">
                <div 
                  className="profile-image-preview" 
                  onClick={() => fileInputRef.current.click()}
                  style={{ backgroundImage: profileImagePreview ? `url(${profileImagePreview})` : 'none' }}
                >
                  {!profileImagePreview && (
                    <div className="profile-image-placeholder">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProfileImageChange}
                  accept="image/*"
                  className="profile-image-input"
                />
                <button 
                  type="button" 
                  className="profile-image-button"
                  onClick={() => fileInputRef.current.click()}
                >
                  {profileImagePreview ? 'Change Image' : 'Upload Image'}
                </button>
              </div>
              <p className="help-text">Recommended size: 300x300px. Max file size: 2MB</p>
            </div>
          </div>
        </div>
        
        <div className="form-group template-selection">
          <label>
            <span className="label-text">Select Template</span>
            <span className="required">*</span>
          </label>
          <div className="template-grid">
            {templates.map(template => (
              <div 
                key={template.id}
                className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="template-preview">
                  <div className="preview-placeholder">
                    <span>{template.name}</span>
                  </div>
                </div>
                <div className="template-info">
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                </div>
                {selectedTemplate === template.id && (
                  <div className="template-selected-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit" className="generate-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19l9 2-9-18-9 18 9-2z"></path>
          </svg>
          Generate Bonus Page
        </button>
      </form>
      
      {generatedUrl && (
        <div className="result-container">
          <div className="result-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h2>Your Bonus Page is Ready!</h2>
          </div>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </button>
          </div>
          <div className="action-buttons">
            <a href={generatedUrl} target="_blank" rel="noopener noreferrer" className="preview-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Preview Page
            </a>
            <a href="/settings" className="settings-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Customize Settings
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
