import React from "react";
import styles from "./AllChatHeader.module.css";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { RiChatNewFill } from "react-icons/ri";

const AllChatHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <h2>Chats</h2>
        <div className={styles.icons}>
          <RiChatNewFill className={styles.icon} />
          <FaEllipsisV className={styles.icon} />
        </div>
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
