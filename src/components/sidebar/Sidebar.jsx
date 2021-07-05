import React from 'react'
import "./sidebar.css"

import { LineStyle } from '@material-ui/icons'

export default function Topbar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <LineStyle className="sidebarIcon" />
                            Home
                        </li>
                        <li className="sidebarListItem">
                            <LineStyle className="sidebarIcon" />
                            Eans
                        </li>
                        <li className="sidebarListItem">
                            <LineStyle className="sidebarIcon" />
                            Boh
                        </li>
                    </ul>

                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <LineStyle className="sidebarIcon" />
                            Home
                        </li>
                        <li className="sidebarListItem">
                            <LineStyle className="sidebarIcon" />
                            Eans
                        </li>
                        <li className="sidebarListItem">
                            <LineStyle className="sidebarIcon" />
                            Boh
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}