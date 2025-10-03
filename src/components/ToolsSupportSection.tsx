import styled from 'styled-components';
import {appTexts} from '../constants/text';
import Text from './Text';
import {FileClaimIcon} from './icons/FileClaimIcon';
import {RoadsideIcon} from './icons/RoadsideIcon';
import {SupportIcon} from './icons/SupportIcon';
import {ChevronRightIcon} from './icons/ChevronRightIcon';

const SectionContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const SectionTitle = styled(Text)`
    align-self: flex-start;
    margin-bottom: 20px;
`;

const ToolsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const ToolCard = styled.a`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    background-color: ${({theme}) => theme.colors.subtleBackground};
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    border: 1px solid ${({theme}) => theme.colors.borders};
    text-decoration: none;
    color: inherit;
    transition: all 150ms ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
        border-color: ${({theme}) => theme.colors.primary};
    }
`;

const LabelContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const IconWrapper = styled.div`
    color: ${({theme}) => theme.colors.primary};
`;

const ChevronWrapper = styled.div`
    color: ${({theme}) => theme.colors.borders};
`;

const tools = [
    {icon: <FileClaimIcon/>, label: appTexts.toolFileClaim},
    {icon: <RoadsideIcon/>, label: appTexts.toolRoadsideAssistance},
    {icon: <SupportIcon/>, label: appTexts.toolContactSupport},
];

export const ToolsSupportSection = () => {
    return (
        <SectionContainer>
            <SectionTitle as="h2" $variant="h2">
                {appTexts.toolsSectionTitle}
            </SectionTitle>
            <ToolsGrid>
                {tools.map((tool) => (
                    <ToolCard key={tool.label} href="#">
                        <LabelContainer>
                            <IconWrapper>{tool.icon}</IconWrapper>
                            <Text $variant="body" style={{fontWeight: 500}}>
                                {tool.label}
                            </Text>
                        </LabelContainer>
                        <ChevronWrapper>
                            <ChevronRightIcon/>
                        </ChevronWrapper>
                    </ToolCard>
                ))}
            </ToolsGrid>
        </SectionContainer>
    );
};