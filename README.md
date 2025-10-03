# My Profile Dashboard 👤

![Days](https://img.shields.io/static/v1?label=Working-Days&message=1&color=blue)
![Status](https://img.shields.io/static/v1?label=Done-Status&message=100%&color=green)

This project is a modern insurance profile dashboard built with React, TypeScript, and styled-components. It provides a dynamic and user-friendly interface for customers to view and manage their insurance policies, with a focus on clean code, reusability, and a developer-friendly setup for HCL DX integration. ✨

## Key Features

-   **Dynamic Policy Dashboard 📄**: Displays a collection of the user's insurance policies, such as Auto, Health, and Pet insurance.
-   **Interactive Policy Cards 💳**: Each card shows key information at a glance, including status badges and context-aware action buttons (e.g., "View Details", "Pay Now", "Check Status").
-   **Detailed Side Panel**: A slide-in panel provides comprehensive information for each policy, neatly organized into tabs like Coverage, Billing & Documents, and Vehicle/Member Info.
-   **Upsell Component ⭐**: A visually distinct card is used to promote additional products, such as Life Insurance, encouraging user engagement.
-   **Live Settings Panel ⚙️**: A developer-focused modal (visible in local development) allows for live changes to the app's state, such as Theme, Product View, and Currency, to simulate different user scenarios.
-   **Responsive & Animated UI 📱**: The layout is fully responsive, and subtle animations powered by Framer Motion enhance the user experience.
-   **Centralized Text & Data Management 🌍**: All static text is managed in a single constants file, and mock data is centralized for easy updates and maintenance.

## 🛠️ Tech Stack

-   **React 19** with TypeScript
-   **Styled-components** for all styling
-   **Framer Motion** for animations
-   **Lucide React** for icons

---

## How to make custom React TS code work for a DX site

### Take care of your React app styles..

* Take a look at the **[globalStyles.ts](src/styles/globalStyles.ts)**. Adding the following rule will protect the app from the DX styles.

```css
* {
    box-sizing: content-box;
}
```

#### Also, it's needed that Buttons, Selectors and major component containers declare this prop

-   `box-sizing: border-box;`

### Settings modal

1.  Look at the **[dx](src/utils/dx)** folder. That's where the settings modal and its related logic are located. This allows the developer to choose a preferred story flow for demos.
2.  The settings modal is used in **[ActiveCoverageHeader.tsx](src/components/ActiveCoverageHeader.tsx)**.
3.  A mandatory file for the Settings modal to show only in edit mode on a DX deployment is **[index.css](src/index.css)**.
4.  In the **[App.tsx](src/App.tsx)** you will see how we detect if the app is running on localhost to conditionally show DX-only features.

#### How to introduce a new setting

Here is a step-by-step guide to all the changes required to introduce a new setting:

**Hypothetical scenario:** _"Product View" setting._ If 'Auto' is selected, the dashboard shows the Auto policy. If 'Health' is selected, the Auto policy is replaced with the Home policy.

1.  **Update Core Types** `src/utils/dx/types.ts`
    1.  Define the new setting's type (e.g., `export type Product = 'Auto' | 'Health';`).
    2.  Add the new property to the `Settings` interface.
2.  **Update Centralized Data** `src/utils/dx/dx-data.ts`
    1.  Export a constant array for the new setting's options.
    2.  Export a constant for the default value.
    3.  Update `MODAL_DATA` with any new UI labels required for the settings modal.
3.  **Update the Settings Configuration** `src/utils/dx/settingsConfig.ts`
    1.  Create a new, strongly-typed config object for the setting.
    2.  Add the new config object to the main `settingsConfig` export.
4.  **Update Settings Context and Modal**
    1.  Add the new setting to the `defaultSettings` object -> `src/utils/dx/settingsContext.tsx`
    2.  Update the union type for the `value` parameter in the `handleSettingChange` function to include the new setting's type -> `src/utils/dx/SettingsModal.tsx`
    3.  Update the type signature in the `FormGroupRenderProps` interface and in the `onChange` handler's type cast to include the new setting's type -> `src/utils/dx/formGroups.tsx`
5.  **Make the Component Data Dynamic**
    1.  This is the final step where you use the new setting. Modify the component that displays the data to read the new setting from the `useSettings` hook and conditionally render its content. In our project, this is handled in **`src/components/PoliciesSection.tsx`**.

##### File Summary:

* `types.ts` **Defines the "shape" of the data.**
* `dx-data.ts` **Provides all static values.**
* `settingsConfig.ts` **Acts as the central registry.**
* `settingsContext.tsx` **Manages the application's state.**
* `formGroups.tsx` **Defines the UI structure.**

### DX config

1.  Look at the **[package.json](package.json)** file. The `scripts` and `config` sections are set up for DX deployment.

```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "dx-deploy": "npm install && npm run build && dxUsername=wpsadmin dxPassword=wpsadmin npm run dx-deploy-app",
    "dx-deploy-app": "dxclient deploy-scriptapplication push -dxUsername $dxUsername -dxPassword $dxPassword -wcmContentName \"$npm_package_config_dxclient_wcmContentName\" -wcmSiteArea \"$npm_package_config_dxclient_wcmSiteArea\" -mainHtmlFile $npm_package_config_dxclient_mainHtmlFile -contentRoot \"$npm_package_config_dxclient_contentRoot\" -dxProtocol $npm_package_config_dxclient_protocol -hostname $npm_package_config_dxclient_hostname -dxPort $npm_package_config_dxclient_port"
},
"config": {
    "dxclient": {
      "wcmContentName": "My Profile",
      "wcmSiteArea": "Script Application Library/Script Portlet Applications",
      "mainHtmlFile": "index.html",
      "contentRoot": "./build",
      "protocol": "https",
      "hostname": "vivre.woodburn.digital",
      "port": "443"
    }
},
"homepage": "./",
"name": "vivre-my-profile"
```

* Things that have to be changed to suit other DX sites:
    * `hostname`
    * `name`
    * `wcmContentName`

### How to deploy

`npm run dx-deploy`

Coded with ❤️ by Juan Patricio Doyle ✨2025