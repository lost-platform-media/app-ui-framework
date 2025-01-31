import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [model, setModel] = useState<AppMenuItem[]>([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('/data/menu.json');
                const data = await response.json();
                setModel(data);
            } catch (error) {
                console.error('Error loading menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    return (
        <MenuProvider>
            <ul className="layout-menu">{model.map((item, i) => (!item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator" key={`separator-${i}`}></li>))}</ul>
        </MenuProvider>
    );
};

export default AppMenu;