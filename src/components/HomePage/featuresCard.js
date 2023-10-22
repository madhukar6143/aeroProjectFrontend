import React from 'react';
import styles from './featuresCard.module.css'; // Import your module.css

function FeaturesCards() {
  return (
    <>
    <div className={styles.cardsContainer}>
      {/* Card 1 - Buyers */}
      <div className={styles.card}>
        <h2>For Buyers</h2>
        <ul>
          <li>Search aircraft parts and overhaul capabilities</li>
          <li>Send RFQs and receive quotes from suppliers</li>
          <li>Improve quality - rate your business partners</li>
          <li>Discover the aviation industry's first quality rating system that helps you make the right purchase decision.</li>
        </ul>
      </div>

      {/* Card 2 - Suppliers */}
      <div className={styles.card}>
        <h2>For Suppliers</h2>
        <ul>
          <li>Create your own supplier shop - list inventory & capabilities</li>
          <li>Receive RFQs and send quotes to buyers</li>
          <li>Improve quality - rate your business partners</li>
        </ul>
      </div>
    </div>
    <div id="featureCarousel" class="carousel slide" data-ride="carousel">

    <ol class="carousel-indicators">
      <li data-target="#featureCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#featureCarousel" data-slide-to="1"></li>
      <li data-target="#featureCarousel" data-slide-to="2"></li>
      <li data-target="#featureCarousel" data-slide-to="3"></li>
    </ol>
  
   
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="carousel-content">
          <h2>Low Price</h2>
          <p>Warrantied inventory at competitive prices</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="carousel-content">
          <h2>Find it Fast</h2>
          <p>Search the world's largest inventory of electronic components by manufacturer, category or part number</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="carousel-content">
          <h2>Quality Guaranteed</h2>
          <p>We sell only warrantied and traceable parts</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="carousel-content">
          <h2>Get it Fast</h2>
          <p>All inventory ready to ship from our sellers</p>
        </div>
      </div>
    </div>
  
    <a class="carousel-control-prev" href="#featureCarousel" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#featureCarousel" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</>  
  );
}

export default FeaturesCards;
