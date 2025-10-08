import styled, {css} from 'styled-components';
import {appTexts} from '../constants/text';
import {PrimaryButton, SecondaryButton} from './Button';
import Text from './Text';
import {CoverageItem} from './CoverageItem';
import {PolicyData} from './PoliciesSection';

export type PolicyStatus = 'active' | 'warning' | 'error';

export interface Coverage {
    label: string;
    value: string;
    percentage: number;
}

interface StatusBadgeProps {
    $status: PolicyStatus;
}

const statusStyles = {
    active: css`
        background-color: ${({theme}) => theme.colors.successTint};
        color: ${({theme}) => theme.colors.success};
    `,
    warning: css`
        background-color: ${({theme}) => theme.colors.warningTint};
        color: #000000;
    `,
    error: css`
        background-color: ${({theme}) => theme.colors.errorTint};
        color: ${({theme}) => theme.colors.error};
    `,
};

const CardContainer = styled.div`
    box-sizing: border-box;
    background-color: ${({theme}) => theme.colors.subtleBackground};
    padding: 24px;
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    border: 1px solid ${({theme}) => theme.colors.borders};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
        border-color: ${({theme}) => theme.colors.primary};
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const PolicyInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const StatusBadge = styled.div<StatusBadgeProps>`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    ${({$status}) => statusStyles[$status]};
`;

const StyledText = styled(Text)`
    color: ${({theme}) => theme.colors.primary};
`;

const CardBody = styled.div`
    flex-grow: 1;
`;

const PolicyIdentifier = styled(Text)<{ $isBlurred?: boolean }>`
    font-weight: ${({theme}) => theme.font.weights.bold};
    color: ${({theme}) => theme.colors.textHeadings};
    transition: filter 0.3s ease-in-out;
    ${({$isBlurred}) =>
            $isBlurred &&
            css`
                filter: blur(4px);
                pointer-events: none;
                user-select: none;
            `}
`;

const PolicyNumber = styled(Text)<{ $isBlurred?: boolean }>`
    margin-top: 4px;
    transition: filter 0.3s ease-in-out;
    ${({$isBlurred}) =>
            $isBlurred &&
            css`
                filter: blur(4px);
                pointer-events: none;
                user-select: none;
            `}
`;

const CoverageModule = styled.div`
    margin-top: 24px;
`;

const ModuleTitle = styled(Text)`
    font-weight: ${({theme}) => theme.font.weights.semiBold};
    color: ${({theme}) => theme.colors.textBody};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
`;

const CoverageList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const CardFooter = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;
`;

interface PolicyCardProps {
    policy: PolicyData;
    onViewDetails: (policy: PolicyData) => void;
}

const statusTextMap: Record<PolicyStatus, string> = {
    active: appTexts.statusActive,
    warning: appTexts.statusPending,
    error: appTexts.statusLapsed,
};

export const PolicyCard = ({policy, onViewDetails}: PolicyCardProps) => {
    const {icon, title, identifier, policyNumber, status, coverages, isBlurred} = policy;
    const buttonText = status === 'warning' ? appTexts.checkStatusButton : appTexts.viewDetailsButton;

    return (
        <CardContainer>
            <CardHeader>
                <PolicyInfo>
                    {icon}
                    <Text as="h3" $variant="h3">{title}</Text>
                </PolicyInfo>
                <StatusBadge $status={status}>
                    <StyledText as="span" $variant="caption" style={{fontWeight: 500}}>
                        {statusTextMap[status]}
                    </StyledText>
                </StatusBadge>
            </CardHeader>

            <CardBody>
                <PolicyIdentifier as="p" $variant="body" $isBlurred={isBlurred}>{identifier}</PolicyIdentifier>
                <PolicyNumber as="p"
                              $variant="caption"
                              $isBlurred={isBlurred}>{`${status === 'warning' ? appTexts.applicationNumberPrefix : appTexts.policyNumberPrefix}${policyNumber}`}</PolicyNumber>

                {coverages && coverages.length > 0 && (
                    <CoverageModule>
                        <ModuleTitle as="h4" $variant="caption">{appTexts.keyCoverageTitle}</ModuleTitle>
                        <CoverageList>
                            {coverages.map((coverage) => (
                                <CoverageItem
                                    key={coverage.label}
                                    label={coverage.label}
                                    value={coverage.value}
                                    percentage={coverage.percentage}
                                />
                            ))}
                        </CoverageList>
                    </CoverageModule>
                )}
            </CardBody>

            <CardFooter>
                {status === 'warning' ? (
                    <PrimaryButton onClick={() => onViewDetails(policy)}>{buttonText}</PrimaryButton>
                ) : (
                    <SecondaryButton onClick={() => onViewDetails(policy)}>
                        {buttonText}
                    </SecondaryButton>
                )}
            </CardFooter>
        </CardContainer>
    );
};