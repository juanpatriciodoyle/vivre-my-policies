import React, {useId, useState} from 'react';
import styled from 'styled-components';
import Text from './Text';

interface CoverageItemProps {
    label: string;
    value: string;
    percentage: number;
}

const TooltipWrapper = styled.div<{ $isVisible: boolean }>`
    position: absolute;
    bottom: calc(100% - 16px);
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;

    opacity: ${({$isVisible}) => ($isVisible ? 1 : 0)};
    transform: ${({$isVisible}) => ($isVisible ? 'translateY(0)' : 'translateY(4px)')};
    transition: opacity 200ms cubic-bezier(0.17, 0.67, 0.83, 0.67),
    transform 200ms cubic-bezier(0.17, 0.67, 0.83, 0.67);
    pointer-events: none;
`;

const TooltipContainer = styled.div`
    background-color: ${({theme}) => theme.colors.textHeadings};
    color: ${({theme}) => theme.colors.background};
    padding: 8px 12px;
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    white-space: nowrap;
    font-size: ${({theme}) => theme.font.sizes.subtext};
    font-weight: ${({theme}) => theme.font.weights.regular};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Caret = styled.div`
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid ${({theme}) => theme.colors.textHeadings};
`;

const ItemContainer = styled.div`
    position: relative;
    width: 100%;
`;

const Label = styled(Text)`
    font-weight: ${({theme}) => theme.font.weights.medium};
    color: ${({theme}) => theme.colors.textHeadings};
    margin-bottom: 6px;
`;

const MeterTrack = styled.div`
    height: 8px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
`;

const MeterFill = styled.div<{ $width: number }>`
    width: ${({$width}) => $width}%;
    height: 100%;
    background-color: ${({theme}) => theme.colors.primary};
    border-radius: 4px;
    transition: width 500ms ease-out;
`;

export const CoverageItem = ({label, value, percentage}: CoverageItemProps) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const tooltipId = useId();
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
        timeoutId = setTimeout(() => {
            setTooltipVisible(true);
        }, 200);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutId);
        setTooltipVisible(false);
    };

    return (
        <ItemContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-describedby={tooltipId}
        >
            <TooltipWrapper $isVisible={isTooltipVisible}>
                <TooltipContainer id={tooltipId} role="tooltip">
                    {value}
                </TooltipContainer>
                <Caret/>
            </TooltipWrapper>
            <Label as="p" $variant="caption">{label}</Label>
            <MeterTrack>
                <MeterFill $width={percentage}/>
            </MeterTrack>
        </ItemContainer>
    );
};