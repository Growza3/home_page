import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../styles/AboutPage.module.css";
import avocadoBottle from "../assets/images/farm3.jpeg"; // First section image
import smallLeafImage from "../assets/images/wine.jpeg"; // Small image between sections
import avocadoFarm from "../assets/images/grapes2.jpeg"; // Second section image
import imageTwo from "../assets/images/farm2.jpeg"; // Update with actual image paths
import teamMember1 from "../assets/images/team1.jpeg"; // Team Member 1
import teamMember2 from "../assets/images/team3.jpg"; // Team Member 2

const AboutPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: false, // Ensures animations replay when scrolling back
      mirror: true, // Replays animation when scrolling up
    });
  }, []);

  return (
    <div>
      {/* First Section (Text Left, Image Right) */}
      <section className={styles.aboutUs}>
        <div className={styles.textContainer} data-aos="fade-up">
          <div className={styles.symbol}>✦</div>
          <h1>Premium Avocado Oil from the sun-kissed farms of Mexico</h1>
          <p>
            We've embarked on a journey inspired by nature’s richness and the 
            incredible benefits of avocado oil. Our brand is a celebration of 
            purity, flavor, and well-being.
          </p>
          <button className={styles.buyNow}>Buy Now</button>
        </div>
        <div className={styles.imageContainer1} data-aos="fade-left">
          <img src={avocadoBottle} alt="Avocado Oil Bottle" />
        </div>
      </section>

      {/* Second Section (Image Left, Small Image, Text Right) */}
      <section className={styles.farmToTable}>
        <div className={styles.imageContainer} data-aos="fade-right">
          <img src={avocadoFarm} alt="Avocado Farm" />
        </div>
        <div className={styles.smallImageContainer} data-aos="zoom-in">
          <img src={smallLeafImage} alt="Decorative Leaf" />
        </div>
        <div className={styles.textContainer} data-aos="fade-up">
          <h2>Farm to Table</h2>
          <p>
            The avocados are grown in Michoacán and bottled in India.  
            We only source 100% pure and unrefined avocado oil.  
            The avocados are hand-sorted, never over-processed, to give you the purest emerald green oil.  
            We deliver products that have maximum nutritional value and minimal environmental impact.
          </p>
        </div>
      </section>

      {/* Third Section (Text Left, Image Right) */}
      <section className={styles.imageGridSection}>
        <div className={styles.textContainer} data-aos="fade-up">
          <h2>Pure & Sustainable Farming</h2>
          <p>
            Our commitment to sustainable farming ensures that every product we
            deliver is of the highest quality. We work closely with local farmers
            to bring the freshest, most natural products to your table.
          </p>
        </div>
        <div className={styles.imageContainer} data-aos="fade-left">
          <img src={imageTwo} alt="Sustainable farming" />
        </div>
      </section>
        {/* Our Team Section */}
        <section className={styles.ourTeamSection} data-aos="fade-up">
        <h2>Meet Our Team</h2>
        <p>Our dedicated team works tirelessly to bring you the finest organic products.</p>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember} data-aos="fade-up">
            <img src={teamMember1} alt="Team Member 1" />
            <h4>Arpita Patil</h4>
            <p>Co-Founder</p>
          </div>
          <div className={styles.teamMember} data-aos="fade-up">
            <img src={teamMember2} alt="Team Member 2" />
            <h4>Mahima Patel</h4>
            <p>Co-Founder</p>
          </div>
        
        </div>
      </section>
    </div>
  );
};

export default AboutPage;