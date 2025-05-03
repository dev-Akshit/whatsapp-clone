import React from "react";
import styles from "./channel.module.css";
import { FaPlus } from "react-icons/fa";

const Channels = () => {
  const channels = [
    { id: 1, name: "Modi", img: "./modiMitrr.jpeg", followers: "11.8M followers"},
    { id: 2, name: "WhatsApp", img: "./whatsapp.jpg", followers: "223.6M followers"},
    { id: 3, name: "Aaj Tak", img: "./Aajtak.jpg", followers: "23.6M followers"},
    { id: 4, name: "Rahul", img: "./pappu.jpeg", followers: "5.7M followers"},
    { id: 5, name: "RCB", img: "./RCB.jpg", followers: "8.6M followers"},
  ];

  return (
    <div className={styles.channelsContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Channels</h2>
        <FaPlus className={styles.addIcon} />
      </div>

      <div className={styles.subHeader}>
        <p className={styles.subPara}>Stay updated on your favorite topics</p>
        <p>Find channels to follow below</p>
      </div>

      <div className={styles.channelList}>
        {channels.map((channel) => (
          <div key={channel.id} className={styles.channelItem}>
          <img src={channel.img} alt={channel.name} className={styles.channelImage} />
          
          <div className={styles.channelDetails}>
            <span className={styles.channelName}>{channel.name}</span>
            <p className={styles.followers}>{channel.followers}</p>
          </div>
        
          <button className={styles.followBtn}>Follow</button>
        </div>        
        ))}
      </div>
      <div className={styles.bottom}>
      <button className={styles.bottomBtn} >Discover more</button>
      </div>
    </div>
  );
};

export default Channels;
