import React, {useMemo, useState} from 'react';
import {HubContainer} from './components/HubContainer';
import {ActiveCoverageHeader} from './components/ActiveCoverageHeader';
import {allPolicies, PoliciesSection, PolicyData} from './components/PoliciesSection';
import {ToolsSupportSection} from './components/ToolsSupportSection';
import {DetailsSidePanel} from './components/DetailsSidePanel';
import {useSettings} from './utils/dx/settingsContext';
import {formatDate} from './utils/dateUtils';
import {CURRENCY_SYMBOLS} from './utils/dx/dx-data';

function App() {
    const [isPanelOpen, setPanelOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState<PolicyData | null>(null);
    const {settings} = useSettings();

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

    const userId = window.appConfig?.userUid || 'default-user-id';
    const userName = window.appConfig?.userCn || 'default-user-name';
    const userLocation = (window.appConfig?.userLocation || '[default-user-location]').replace(/[[\]]/g, '');


    const {nextPaymentAmount, nextPaymentDate} = useMemo(() => {
        const activePolicies = Object.values(allPolicies).filter(p => p.status === 'active');
        const total = activePolicies.reduce((sum, p) => sum + p.billingInfo.nextPayment.amount, 0);
        const soonestDate = activePolicies.reduce((soonest, p) => {
            return p.billingInfo.nextPayment.dueDate < soonest ? p.billingInfo.nextPayment.dueDate : soonest;
        }, new Date('2999-12-31'));

        return {
            nextPaymentAmount: total,
            nextPaymentDate: formatDate(soonestDate, {month: 'short', day: '2-digit', year: 'numeric'}),
        };
    }, []);

    return (
        <>
            <HubContainer>
                <ActiveCoverageHeader
                    isLocalhost={isLocalhost}
                    nextPaymentAmount={nextPaymentAmount}
                    nextPaymentDate={nextPaymentDate}
                    currencySymbol={CURRENCY_SYMBOLS[settings.currency]}
                />
                <PoliciesSection onViewDetails={handleViewDetails} product={settings.product}/>
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