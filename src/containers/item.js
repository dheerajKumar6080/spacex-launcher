import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { config } from '../constants';
import '../styles/item.css';

const Item = (props) => {
    const {
        flight_number: flightNumber,
        mission_name: nameOfMission,
        launch_year: yearOfLaunch,
        launch_success: launchSuccess,
        links,
        mission_id: idOfMission,
        rocket
    } = props.launchdata


    function setCardContent() {
        return (
            <>
                <Row >
                    <Col className='textFontStyle' xs={7} >{`${config.year}:`}</Col>
                    <Col xs={5} >{yearOfLaunch}</Col>
                </Row>
                <Row >
                    <Col className='textFontStyle' xs={7} >{`${config.launch}:`}</Col>
                    <Col xs={5} >{launchSuccess.toString()}</Col>
                </Row>
                <Row >
                    <Col className='textFontStyle' xs={7} >{`${config.land}:`}</Col>
                    <Col xs={5} >
                        {(rocket.first_stage.cores[0].land_success) === null
                            ? "No data"
                            : (rocket.first_stage.cores[0].land_success).toString()
                        }
                    </Col>
                </Row>
            </>
        )
    }

    function setMission() {
        return(
            <div>
            <div className='mission_info'>{'Mission Ids:'}</div>
            <ul className='missionclass'>
                {Array.isArray(idOfMission) && idOfMission.length > 0 ? (
                    idOfMission.map((item, idx) => (
                        <li key={`missionId_${idx}`}>{item}</li>
                    ))
                ) : (
                        <li>{'No data present'}</li>
                    )
                }
            </ul>
        </div>
        )
    }

    function setCardBody() {
        return (
            <Card.Body id='cardSkin' >
                <Card.Title id='cardHeader'>
                    {`${nameOfMission} #${flightNumber}`}
                </Card.Title>

                {setMission()}
            
                {setCardContent()}

            </Card.Body>

        )
    }


    function setHtmlForItem() {
        return (
            <Card className='cardwrap' key={`${nameOfMission}_${flightNumber}`} >
                {links.mission_patch_small && (
                    <Card.Img variant="top"
                        className="cardPic"
                        src={links.mission_patch_small}
                        alt={nameOfMission} />
                )}
                {setCardBody()}
            </Card>

        )
    }


    return (
        <>

            {setHtmlForItem()}
        </>
    )
}

export default Item;