import React, { useState } from "react";
import styles from "./AllChatHeader.module.css";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { RiChatNewFill } from "react-icons/ri";
import { MdOutlineGroups, MdPeopleAlt } from "react-icons/md";


const AllChatHeader = ({ searchQuery, setSearchQuery }) => {
  const [newChat, setnewChat] = useState(false);
  const [menu, setMenu] = useState(false);
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <h2>Chats</h2>
        <div className={styles.icons}>
          <div className={styles.newChat}>
          <RiChatNewFill 
          className={styles.icon} 
          onClick={() => {
            setnewChat(!newChat);
            setTimeout(() => setnewChat(false), 2000);
            setMenu(false);
          }}
          />
          </div>
          <div>
          <FaEllipsisV 
          className={styles.icon} 
          onClick={() => {
            setMenu(!menu);
            setTimeout(() => setMenu(false), 3000);
            setnewChat(false);
          }}
          />
          </div>
        </div>
        {
          newChat && (
            <div className={styles.chat}>
              <div className={styles.chatItem}>
              <MdPeopleAlt className={styles.headIcon}/>
              <div>New Group</div>
              </div>
              <div className={styles.chatItem}>
              <MdOutlineGroups className={styles.headIcon} />
              <div>New Community</div>
              </div>
            </div>
          )
          
        }
        {
          menu && (
            <div className={styles.menuBar}>
              <div className={styles.menuItem}>
                <div className={styles.menuIcon}>New group</div>
                <div className={styles.menuIcon}>Starred messages</div>
                <div className={styles.menuIcon}>Select chats</div>
                <div className={styles.menuIcon}>Log out</div>
                <div className={styles.menuIcon}>Get WhatsApp for Windows</div>
              </div>
            </div>
          )
        }
      </div>

      {/* Search Input */}
      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button className={styles.activeTab}>All</button>
        <button>Unread</button>
        <button>Favorites</button>
        <button>Groups</button>
      </div>
    </div>
  );
};

export default AllChatHeader;
