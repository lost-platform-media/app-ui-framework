/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/context/layoutcontext';

const Dashboard = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Welcome</h5>
                    <p>Use this page to start from scratch and place your custom content.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
