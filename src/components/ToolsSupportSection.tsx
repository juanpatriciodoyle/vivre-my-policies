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

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    &:not(:last-child) {
        border-bottom: 1px solid ${({theme}) => theme.colors.borders};
    }
`;

const ListItemLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 8px;
    margin: 0 -8px;
    border-radius: 6px;
    text-decoration: none;
    color: inherit;
    transition: background-color 150ms ease;

    &:hover {
        background-color: ${({theme}) => theme.colors.secondaryAction};
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
            <List>
                {tools.map((tool) => (
                    <ListItem key={tool.label}>
                        <ListItemLink href="#">
                            <LabelContainer>
                                <IconWrapper>{tool.icon}</IconWrapper>
                                <Text $variant="body" style={{fontWeight: 500}}>
                                    {tool.label}
                                </Text>
                            </LabelContainer>
                            <ChevronWrapper>
                                <ChevronRightIcon/>
                            </ChevronWrapper>
                        </ListItemLink>
                    </ListItem>
                ))}
            </List>
        </SectionContainer>
    );
};