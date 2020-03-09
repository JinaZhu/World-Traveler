import styled from "styled-components";

export const NavAlign = styled.nav`
    float: right;
`;

export const Wrapper = styled.div`
    padding: 0 5%;    
    margin: 0;
`;

export const Slider = styled.div`
    position: absolute; 
    top: 0;
    left: 0;
    width: 100%;
    height: 125vh;
    background: linear-gradient(to top, #E5DACE, #6D7973);
    z-index: -1;
`;

export const Info = styled.div`
    margin: 0 10%;
`;

export const FilteredPhoto = styled.img`
    width: 250;
    height: 250;    
    opacity: 0.85;
    filter: grayscale(10%) sepia(30%) saturate(1.5) brightness(1.1) contrast(1); 
`










