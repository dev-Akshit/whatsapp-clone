import React, { useState, useRef, useEffect } from "react";
import styles from "./AllChatHeader.module.css";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { RiChatNewFill } from "react-icons/ri";
import { MdOutlineGroups, MdPeopleAlt } from "react-icons/md";

const AllChatHeader = ({ searchQuery, setSearchQuery , setIsAuthenticated}) => {
  const [newChat, setNewChat] = useState(false);
  const [menu, setMenu] = useState(false);
  const newChatRef = useRef(null);
  const menuRef = useRef(null);
  const newChatButtonRef = useRef(null);
  const menuButtonRef = useRef(null);
  
  // Handle clicks outside the menus
  useEffect(() => {
    function handleClickOutside(event) {
      // For new chat menu
      if (
        newChat &&
        !newChatRef.current?.contains(event.target) &&
        !newChatButtonRef.current?.contains(event.target)
      ) {
        setNewChat(false);
      }
      
      // For settings menu
      if (
        menu &&
        !menuRef.current?.contains(event.target) &&
        !menuButtonRef.current?.contains(event.target)
      ) {
        setMenu(false);
      }
    }
    
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newChat, menu]);
  
  const toggleNewChat = () => {
    setNewChat(!newChat);
    setMenu(false); // Close other menu
  };
  
  const toggleMenu = () => {
    setMenu(!menu);
    setNewChat(false); // Close other menu
  };

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <h2 className={styles.headerText}>Chats</h2>
        <div className={styles.icons}>
          <div className={styles.newChat}>
            <RiChatNewFill 
              className={styles.icon}
              ref={newChatButtonRef} 
              onClick={toggleNewChat}
            />
          </div>
          <div>
            <FaEllipsisV 
              className={styles.icon}
              ref={menuButtonRef}
              onClick={toggleMenu}
            />
          </div>
        </div>
        {
          newChat && (
            <div className={styles.chat} ref={newChatRef}>
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
            <div className={styles.menuBar} ref={menuRef}>
              <div className={styles.menuItem}>
                <div className={styles.menuIcon}>New group</div>
                <div className={styles.menuIcon}>Starred messages</div>
                <div className={styles.menuIcon}>Select chats</div>
                <div className={styles.menuIcon} onClick={handleLogout}>Log out</div>
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