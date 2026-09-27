import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  url: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, url }) => {
  useEffect(() => {
    document.title = title;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);

    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:url', url, true);
    updateMeta('og:image', 'https://sumant.dev/og-image.jpg', true);

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', 'https://sumant.dev/og-image.jpg');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Structured JSON-LD Data
    let scriptTag = document.getElementById('jsonld-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-structured-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sumant Kumar Yadav",
      "jobTitle": "Software Engineer & MERN Stack Developer",
      "url": url,
      "sameAs": [
        "https://github.com/sumant-yadav",
        "https://linkedin.com/in/sumant-yadav"
      ]
    };
    scriptTag.innerHTML = JSON.stringify(structuredData);

  }, [title, description, url]);

  return null;
};
