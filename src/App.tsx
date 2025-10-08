import React, {useState} from 'react';
import {HubContainer} from './components/HubContainer';
import {PoliciesSection, PolicyData} from './components/PoliciesSection';
import {ToolsSupportSection} from './components/ToolsSupportSection';
import {DetailsSidePanel} from './components/DetailsSidePanel';
import {useSettings} from './utils/dx/settingsContext';

function App() {
    const [isPanelOpen, setPanelOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState<PolicyData | null>(null);
    const {settings} = useSettings();

    const userId = window.appConfig?.userUid || 'VIV-ACCOUNT-1';

    const handleViewDetails = (policy: PolicyData) => {
        setSelectedPolicy(policy);
        setPanelOpen(true);
    };

    const handleClosePanel = () => {
        setPanelOpen(false);
    };

    const isLocalhost = Boolean(
        window.location.hostname === 'localhost' ||
        window.location.hostname === '[::1]' ||
        window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    );

    return (
        <>
            <HubContainer>
                <PoliciesSection onViewDetails={handleViewDetails} product={settings.product} isLocalhost={isLocalhost}
                                 userId={userId}/>
                <ToolsSupportSection/>
            </HubContainer>
            <DetailsSidePanel
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
                policy={selectedPolicy}
            />
        </>
    );
}

export default App;