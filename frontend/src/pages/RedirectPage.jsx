import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // You would normally fetch from a backend.
    // For demo, we're reading from localStorage or dummy data.
    const storedData = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');

    const match = storedData.find((item) => item.short === shortcode);

    if (match) {
      const expiryTime = match.createdAt + match.expiry * 60 * 1000;
      const now = Date.now();

      if (now > expiryTime) {
        alert('This URL has expired.');
        navigate('/');
      } else {
        window.location.href = match.original;
      }
    } else {
      alert('Shortcode not found.');
      navigate('/');
    }
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
