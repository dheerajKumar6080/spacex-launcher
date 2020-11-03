import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import Launch from './LaunchContainer';
import { dataGetterFromApi } from '../apicalls';
import { Row, Col, Container } from 'react-bootstrap';
import DotLoader from '../components/DotLoader';
import { config } from '../constants';
import '../styles/HomePage.css';

function HomeContainer(props) {
    let propArray = [];
    if (props.staticContext) {
        propArray = props.staticContext.initData
    }
    const [initData, intialDataSetter] = useState(propArray);
    const [loaderActive, loaderStateSetter] = useState(true);

    useEffect(() => {
        if (initData.length === 0) {
            setTimeout(() => {
                if (window.__SSR_DATA__) {
                    intialDataSetter(JSON.parse(window.__SSR_DATA__));
                    loaderStateSetter(false);
                    delete window.__SSR_DATA__;
                } else {
                    dataGetterFromApi(config.firsturl)
                        .then(res => {
                            intialDataSetter(res.data);
                            loaderStateSetter(false);
                        })
                        .catch(err => console.log(err))
                }
            }, 0);
        }
    }, [initData]);

    function setFilterAndLaunchHtml() {
        return (
            <>
                <Col xs={12} md={4} lg={2} className="styleFilter">
                    <Filters />
                </Col>
                <Col xs={12} md={8} lg={10} className="launchClass">
                    {!loaderActive ? (
                        <Launch loaderActive={loaderActive} historyInfo={props} data={initData} />
                    ) :
                        <div><DotLoader /></div>
                    }
                </Col>
            </>
        )
    }

    function setDeveloper() {
        return (
            <div className='parentDevison'>
                <span className='classDevison'>{'Developed by: '}</span>
                {config.developer}
            </div>
        )
    }

    function setHtmlForHomePage() {
        return (
            <Container fluid className='countClass' >
                <Row className='textCls'>{config.header}</Row>
                <Row>
                    {setFilterAndLaunchHtml()}
                </Row>
                <Row>
                    {setDeveloper()}
                </Row>
            </Container>


        )
    }

    return (
        <div className="containerOuter">
            {setHtmlForHomePage()}
        </div>
    )
}

export default HomeContainer;