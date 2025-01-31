"use client";

import { PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Sidebar } from 'primereact/sidebar';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { classNames } from 'primereact/utils';
import React, { useContext, useEffect, useState } from 'react';
import { AppConfigProps, LayoutConfig, LayoutState } from '@/types';
import { LayoutContext } from './context/layoutcontext';

const LOCAL_STORAGE_KEY = 'appLayoutConfig';

// Default configuration as a fallback
const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
    scale: 14,
    menuMode: 'static',
    inputStyle: 'outlined',
    ripple: true,
    theme: 'lostmedia-light',
    colorScheme: 'light',
};

const AppConfig = (props: AppConfigProps) => {
    const [scales] = useState([12, 13, 14, 15, 16]);
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const { setRipple, changeTheme } = useContext(PrimeReactContext);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    // Load configuration from localStorage or fallback to default on mount
    useEffect(() => {
        const savedConfig = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (savedConfig) {
            try {
                const parsedConfig = JSON.parse(savedConfig);
                setLayoutConfig((prevState: LayoutConfig) => ({
                    ...DEFAULT_LAYOUT_CONFIG, // Ensure defaults are set for missing keys
                    ...parsedConfig,
                }));
            } catch (error) {
                console.error('Failed to parse layout config from localStorage, using defaults.', error);
                setLayoutConfig(DEFAULT_LAYOUT_CONFIG);
            }
        } else {
            setLayoutConfig(DEFAULT_LAYOUT_CONFIG);
        }
    }, [setLayoutConfig]);

    // Save configuration to localStorage whenever layoutConfig changes
    useEffect(() => {
        if (layoutConfig) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(layoutConfig));
        }
    }, [layoutConfig]);

    const onConfigButtonClick = () => {
        setLayoutState((prevState: LayoutState) => ({ ...prevState, configSidebarVisible: true }));
    };

    const onConfigSidebarHide = () => {
        setLayoutState((prevState: LayoutState) => ({ ...prevState, configSidebarVisible: false }));
    };

    const resetToDefaults = () => {
        // Reset the configuration to the default values
        setLayoutConfig(DEFAULT_LAYOUT_CONFIG);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_LAYOUT_CONFIG));
    };

    const changeInputStyle = (e: RadioButtonChangeEvent) => {
        setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, inputStyle: e.value }));
    };

    const changeRipple = (e: InputSwitchChangeEvent) => {
        setRipple?.(e.value as boolean);
        setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, ripple: e.value as boolean }));
    };

    const changeMenuMode = (e: RadioButtonChangeEvent) => {
        setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, menuMode: e.value }));
    };

    const _changeTheme = (theme: string, colorScheme: string) => {
        changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, theme, colorScheme }));
        });
    };

    const decrementScale = () => {
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            scale: Math.max(scales[0], prevState.scale - 1),
        }));
    };

    const incrementScale = () => {
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            scale: Math.min(scales[scales.length - 1], prevState.scale + 1),
        }));
    };

    const applyScale = () => {
        if (layoutConfig && layoutConfig.scale) {
            document.documentElement.style.fontSize = layoutConfig.scale + 'px';
        }
    };

    // Apply font scale whenever it changes
    useEffect(() => {
        applyScale();
    }, [layoutConfig.scale]);

    return (
        <>
            <button className="layout-config-button config-link" type="button" onClick={onConfigButtonClick}>
                <i className="pi pi-cog"></i>
            </button>

            <ConfirmDialog
                visible={showConfirmDialog}
                onHide={() => setShowConfirmDialog(false)}
                message="Are you sure you want to reset all settings to defaults?"
                header="Reset Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={resetToDefaults} // Resets the settings on confirmation
                reject={() => setShowConfirmDialog(false)} // Hides the dialog
            />

            <Sidebar
                visible={layoutState.configSidebarVisible}
                onHide={onConfigSidebarHide}
                position="right"
                className="layout-config-sidebar w-20rem"
            >
                {!props.simple && (
                    <>
                        <h5>Scale</h5>
                        <div className="flex align-items-center">
                            <Button
                                icon="pi pi-minus"
                                type="button"
                                onClick={decrementScale}
                                rounded
                                text
                                className="w-2rem h-2rem mr-2"
                                disabled={layoutConfig.scale === scales[0]}
                            ></Button>
                            <div className="flex gap-2 align-items-center">
                                {scales.map((item) => (
                                    <i
                                        className={classNames('pi pi-circle-fill', {
                                            'text-primary-500': item === layoutConfig.scale,
                                            'text-300': item !== layoutConfig.scale,
                                        })}
                                        key={item}
                                    ></i>
                                ))}
                            </div>
                            <Button
                                icon="pi pi-plus"
                                type="button"
                                onClick={incrementScale}
                                rounded
                                text
                                className="w-2rem h-2rem ml-2"
                                disabled={layoutConfig.scale === scales[scales.length - 1]}
                            ></Button>
                        </div>

                        <h5>Menu Type</h5>
                        <div className="flex">
                            <div className="field-radiobutton flex-1">
                                <RadioButton
                                    name="menuMode"
                                    value="static"
                                    checked={layoutConfig.menuMode === 'static'}
                                    onChange={changeMenuMode}
                                    inputId="mode1"
                                ></RadioButton>
                                <label htmlFor="mode1">Static</label>
                            </div>
                            <div className="field-radiobutton flex-1">
                                <RadioButton
                                    name="menuMode"
                                    value="overlay"
                                    checked={layoutConfig.menuMode === 'overlay'}
                                    onChange={changeMenuMode}
                                    inputId="mode2"
                                ></RadioButton>
                                <label htmlFor="mode2">Overlay</label>
                            </div>
                        </div>

                        <h5>Input Style</h5>
                        <div className="flex">
                            <div className="field-radiobutton flex-1">
                                <RadioButton
                                    name="inputStyle"
                                    value="outlined"
                                    checked={layoutConfig.inputStyle === 'outlined'}
                                    onChange={changeInputStyle}
                                    inputId="outlined_input"
                                ></RadioButton>
                                <label htmlFor="outlined_input">Outlined</label>
                            </div>
                            <div className="field-radiobutton flex-1">
                                <RadioButton
                                    name="inputStyle"
                                    value="filled"
                                    checked={layoutConfig.inputStyle === 'filled'}
                                    onChange={changeInputStyle}
                                    inputId="filled_input"
                                ></RadioButton>
                                <label htmlFor="filled_input">Filled</label>
                            </div>
                        </div>

                        <h5>Ripple Effect</h5>
                        <InputSwitch
                            checked={layoutConfig.ripple as boolean}
                            onChange={changeRipple}
                        ></InputSwitch>

                        <h5>Reset Settings</h5>
                        <Button
                            label="Reset to Defaults"
                            className="p-button"
                            onClick={() => setShowConfirmDialog(true)}
                        />
                    </>
                )}

                {/* <h5>Color Schema</h5>
                <div className="grid">
                    <div className="col-3">
                        <button
                            className="p-link w-2rem h-2rem"
                            onClick={() => _changeTheme('solit-light', 'light')}
                        >
                            <img
                                src="/layout/images/themes/solit-light.png"
                                className="w-2rem h-2rem"
                                alt="SOLIT Light"
                            />
                        </button>
                    </div>
                </div> */}
            </Sidebar>
        </>
    );
};

export default AppConfig;
