import React from 'react'
import "./topbar.css"

import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <div className="logo">Eracle</div>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNoneOutlinedIcon />
                        <div className="topIconBadge">2</div>
                    </div>
                    <div className="topbarIconContainer">
                        <LanguageOutlinedIcon />
                    </div>
                    <div className="topbarIconContainer">
                        <SettingsOutlinedIcon />
                    </div>
                    <img src="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}