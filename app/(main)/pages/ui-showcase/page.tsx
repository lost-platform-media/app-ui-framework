/* eslint-disable @next/next/no-sync-scripts */
"use client";

import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Chips } from "primereact/chips";
import { Rating } from "primereact/rating";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TabView, TabPanel } from "primereact/tabview";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ProgressBar } from "primereact/progressbar";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { SplitButton } from "primereact/splitbutton";
import { InputSwitch } from "primereact/inputswitch";

const UIShowCase = () => {
    const [textValue, setTextValue] = useState("");
    const [dropdownValue, setDropdownValue] = useState(null);
    const [dateValue, setDateValue] = useState(null);
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState(null);
    const [numberValue, setNumberValue] = useState(0);
    const [chipsValue, setChipsValue] = useState([]);
    const [ratingValue, setRatingValue] = useState(0);
    const [switchValue, setSwitchValue] = useState(false);
    const [progress, setProgress] = useState(50);
    const toast = React.useRef(null);

    const dropdownOptions = [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
    ];

    const confirm = () => {
        confirmDialog({
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => toast.current.show({ severity: "info", summary: "Confirmed", detail: "You have accepted", life: 3000 }),
            reject: () => toast.current.show({ severity: "warn", summary: "Rejected", detail: "You have rejected", life: 3000 }),
        });
    };

    const splitButtonItems = [
        { label: "Option 1", icon: "pi pi-check", command: () => toast.current.show({ severity: "info", summary: "Option 1", detail: "Selected Option 1", life: 3000 }) },
        { label: "Option 2", icon: "pi pi-times", command: () => toast.current.show({ severity: "info", summary: "Option 2", detail: "Selected Option 2", life: 3000 }) },
    ];

    const tableData = [
        { id: 1, name: "John Doe", age: 25 },
        { id: 2, name: "Jane Smith", age: 30 },
        { id: 3, name: "Mike Ross", age: 35 },
    ];

    return (
        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />
                <ConfirmDialog />
                <div className="card">
                    <h5>UI Showcase</h5>

                    <div className="field">
                        <label htmlFor="text-input">Text Input</label>
                        <InputText
                            id="text-input"
                            value={textValue}
                            onChange={(e) => setTextValue(e.target.value)}
                            placeholder="Enter text"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="dropdown">Dropdown</label>
                        <Dropdown
                            id="dropdown"
                            value={dropdownValue}
                            options={dropdownOptions}
                            onChange={(e) => setDropdownValue(e.value)}
                            placeholder="Select an option"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="calendar">Calendar</label>
                        <Calendar
                            id="calendar"
                            value={dateValue}
                            onChange={(e) => setDateValue(e.value)}
                        />
                    </div>

                    <div className="field-checkbox">
                        <Checkbox
                            inputId="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.checked)}
                        />
                        <label htmlFor="checkbox">Checkbox</label>
                    </div>

                    <div className="field-radiobutton">
                        <RadioButton
                            inputId="radio1"
                            name="group1"
                            value="Option 1"
                            onChange={(e) => setRadioValue(e.value)}
                            checked={radioValue === "Option 1"}
                        />
                        <label htmlFor="radio1">Option 1</label>

                        <RadioButton
                            inputId="radio2"
                            name="group1"
                            value="Option 2"
                            onChange={(e) => setRadioValue(e.value)}
                            checked={radioValue === "Option 2"}
                        />
                        <label htmlFor="radio2">Option 2</label>
                    </div>

                    <div className="field">
                        <label htmlFor="input-number">Input Number</label>
                        <InputNumber
                            id="input-number"
                            value={numberValue}
                            onValueChange={(e) => setNumberValue(e.value)}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="chips">Chips</label>
                        <Chips
                            id="chips"
                            value={chipsValue}
                            onChange={(e) => setChipsValue(e.value)}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="rating">Rating</label>
                        <Rating
                            id="rating"
                            value={ratingValue}
                            onChange={(e) => setRatingValue(e.value)}
                        />
                    </div>

                    <div className="field">
                        <Button label="Primary Button" className="p-button-primary" />
                        <Button label="Secondary Button" className="p-button-secondary ml-2" />
                    </div>

                    <div className="field">
                        <label htmlFor="switch">Input Switch</label>
                        <InputSwitch
                            id="switch"
                            checked={switchValue}
                            onChange={(e) => setSwitchValue(e.value)}
                        />
                    </div>

                    <div className="field">
                        <label>Progress Bar</label>
                        <ProgressBar value={progress} />
                    </div>

                    <div className="field">
                        <Button label="Show Confirm Dialog" onClick={confirm} />
                    </div>

                    <div className="field">
                        <SplitButton label="Split Button" model={splitButtonItems} />
                    </div>

                    <div className="field">
                        <DataTable value={tableData}>
                            <Column field="id" header="ID" />
                            <Column field="name" header="Name" />
                            <Column field="age" header="Age" />
                        </DataTable>
                    </div>

                    <div className="field">
                        <FileUpload name="demo" url="./upload" accept="image/*" />
                    </div>

                    <Accordion>
                        <AccordionTab header="Accordion 1">Content 1</AccordionTab>
                        <AccordionTab header="Accordion 2">Content 2</AccordionTab>
                    </Accordion>

                    <TabView>
                        <TabPanel header="Tab 1">Tab Content 1</TabPanel>
                        <TabPanel header="Tab 2">Tab Content 2</TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default UIShowCase;
