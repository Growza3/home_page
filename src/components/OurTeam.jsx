import AOS from "aos";
import { useEffect } from "react"; // Import useEffect

import "aos/dist/aos.css";
import teamMember1 from "../assets/images/team1.jpeg"; // Team Member 1
import teamMember2 from "../assets/images/team3.jpg"; // Team Member 2
import styles from "../styles/OurTeam.module.css"; // Team Styles
const OurTeam = () => {
    useEffect(() => {
      AOS.init({ duration: 1000, once: true }); // Initialize AOS
    }, []);
return (
    <div>
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
)};
export default OurTeam;