import styled from "styled-components";
import { NavLink, Button, Nav } from "reactstrap";

export const StyledNavLink = styled(NavLink)`
  color: #3f3931;

  &:hover {
    color: #6d7973;
  }
`;

export const CityNavLink = styled(NavLink)`
  color: #3f3931;

  &:hover {
    color: #6d7973;
  }
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
  height: 120vh;
  background: linear-gradient(
    to top,
    white,
    #b2b2a2,
    #6d7973,
    #b2b2a2,
    #e5dace,
    #e7baa0,
    #e7c9a9
  );
  z-index: -1;
`;

export const InfoSlider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const Info = styled.div`
  top: 0;
  margin: 0 7%;
  background: linear-gradient(
    to top,
    white,
    #e7c9a9,
    #e7baa0,
    #e5dace,
    #b2b2a2,
    #6d7973,
    #b2b2a2,
    white
  );
`;

export const FilteredPhoto = styled.img`
  opacity: 0.8;
  filter: grayscale(10%) sepia(30%) saturate(1.1) brightness(1.1) contrast(1);
  margin: 1%;
`;

export const StyledH3 = styled.h3`
  display: flex;
  margin: 5% 40;
  color: #3f3931;
  font-size: 35px;
  justify-content: center;
  align-items: center;
  fontweight: bold;
  letter-spacing: 3px;
`;

export const ButtonAlign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3% 50%;
`;

export const PhotoAlign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
`;

export const InfoStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5%;
`;

export const IconStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 5%;
`;

export const CityStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 15px;
`;

export const CityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 50px;
`;

export const TempStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const WarmTempStyle = styled.b`
  width: 50px;
  height: 50px;
  background: linear-gradient(to top, white, #ffefd5);
`;

export const ColdTempStyle = styled.b`
  width: 50px;
  height: 50px;
  background: linear-gradient(to top, white, #b0e0e6);
`;

export const MonthStyle = styled.b`
  width: 54px;
  height: 25px;
`;

export const TempContainer = styled.div`
  max-height: 500px;
`;

export const SaveRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  margin: 0;
`;

export const Polaroid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 403.2px;
  width: 336px;
  margin: 5%;
  padding: 1.5rem 2rem;
  border-style: solid;
  background: #f5f5f5;
  border-radius: 5px;
  box-shadow: 10px 5px 5px #3f3931;
`;

export const PolaroidTitle = styled.p`
  text-align: center;
  padding: 0;
  font-size: 20px;
`;

export const DeleteButton = styled(Button)`
  color: #3f3931;

  &:hover {
    color: #6d7973;
  }
`;

export const PolaroidLayout = styled.div`
  position: absolute;
  left: 0;
  right: -10;
  background: linear-gradient(
    to top,
    #6d7973,
    #b2b2a2,
    #e7c9a9,
    #e7baa0,
    white
  );
`;

export const NavAlign = styled(Nav)`
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SeperateButton = styled(Nav)`
  margin: 6px;
`;

export const TicketBox = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-style: solid;
  border-radius: 15px;
  margin: 25px;
`;

export const TicketSections = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 0;
`;

export const TicketHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #6d7973;
`;

export const TitleStyle = styled.h3`
    align-text: right;
    color: white;
    font-weight: bold
    width: 600px
`;

export const DetailBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: white
    width: "650px"
`;

export const TicketDetailBoxLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background: white
    width: "700px"
`;

export const TicketDetailBoxRight = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background: white;
`;

export const DetailTitleP = styled.p`
  color: 6d7973;
  margin: 2px;
  font-weight: bold;
`;

export const DetailDataP = styled.p`
  color: 6d7973;
  margin: 2px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SaveContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 17%;
`;

export const SaveBox = styled.div`
  border: 1px solid;
  padding: 5%;
  margin: 10px;
  height: 170px;
`;
