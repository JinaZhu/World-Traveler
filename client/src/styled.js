import styled from "styled-components";
import { NavLink } from 'reactstrap';

export const NavAlign = styled.nav`
    float: right;
`;

export const StyledNavLink = styled(NavLink)`
    color: #3F3931;

    &:hover {
        color: #6D7973;
    }
`

export const CityNavLink = styled(NavLink)`
    color: white;

    &:hover {
        color: #6D7973;
    }
`

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
    background: linear-gradient(to top, white, #B2B2A2, #6D7973, #B2B2A2, #E5DACE, #E7BAA0, #e7c9a9);
    z-index: -1;
`;


export const Info = styled.div`
    margin: 0 7%;
`;


export const FilteredPhoto = styled.img`
    width: 250;
    height: 250;    
    opacity: 0.85;
    filter: grayscale(10%) sepia(30%) saturate(1.5) brightness(1.1) contrast(1); 
    margin: 1%; 
`

export const StyledH3 = styled.h3`
    display: flex; 
    margin: 5% 40; 
    color: #3F3931; 
    font-size: 35px; 
    justify-content: center;
    align-items: center;
    background: linear-gradient(to left, white, #e7c9a9, white);
    fontWeight: bold;
`

export const ButtonAlign = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    margin: 3% 50%;
`

export const PhotoAlign = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    background: linear-gradient(to top, white, #E7BAA0, #E5DACE, white);
`

export const InfoStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5%
`

export const IconStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 5%;
`

export const CityStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
`

export const TempStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;                                                
`
export const WarmTempStyle = styled.b`
    width: 50px;
    height: 50px; 
    background: linear-gradient(to top, white, #ffefd5);
`

export const ColdTempStyle = styled.b`
    width: 50px;
    height: 50px; 
    background: linear-gradient(to top, white, #b0e0e6);
`

export const MonthStyle = styled.b`
    width: 54px;
    height: 25px; 
`
export const TempContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 5%; 
`












