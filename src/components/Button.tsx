import styled from 'styled-components';

export const PrimaryButton = styled.button`
    box-sizing: border-box;
    padding: 12px 20px;
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    background-color: ${({theme}) => theme.colors.primary};
    color: #ffffff;
    font-family: ${({theme}) => theme.font.primary};
    font-size: ${({theme}) => theme.font.sizes.button};
    font-weight: ${({theme}) => theme.font.weights.medium};
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({theme}) => theme.colors.primaryHover};
    }
`;