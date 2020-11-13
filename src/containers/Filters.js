import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import history from '../routes/history';
import '../styles/filter.css';
import TextField from '../components/TextField';
import { config } from '../constants';
import { styleOnBtnLoad, buttonDataGetter, styleMyButton } from '../utilityHelper';

const Filters = () => {
    const launch_years = config.enumYear;

    useEffect(() => {
        if(typeof window !== 'undefined'){
            let url = window.location.href;
            styleOnBtnLoad(url);
        }
    }, [])

    
    const historySetter = (path, val, btnId, buttonClass) => {       
        let href = window.location.href;
        const loadState = {"isLoading": true};
        buttonStyleSetter(btnId, buttonClass);
        if(href.split('/')[3] === ""){
            history.push({
                 pathname: '/launchPage',
                 state: loadState,
                 search: `?${path}`
            })
        } else {    
            let existingpath = href.split("?")[1];
            let subpath, new_path;
            if(href.indexOf(val) !== -1){
                subpath = existingpath.substr(existingpath.indexOf(val), path.length);
                subpath = subpath.indexOf("fals") !== -1 
                    ? existingpath.substr(existingpath.indexOf(val), path.length + 1)
                    : subpath             
                new_path = existingpath.replace(subpath, path);
            } else {
                new_path = `${existingpath}&&${path}`
            }
            history.push({
                pathname: '/launchPage',
                state: loadState,
                search: `?${new_path}`
            })             
        }
    }

    const buttonStyleSetter = (btnId, buttonClass) => {
        if(btnId){
            let allbtns = document.getElementsByClassName(buttonClass);
            let clickedbtn = document.getElementById(btnId);
            buttonDataGetter(allbtns);
            styleMyButton(clickedbtn, "#28a745", "#fff");   
        }
    }


    const button_getter = (path, btnclass) => {
        return (
            <>
                <Col xs={6} className='column-class'>
                    <Button className={`buttonClass ${btnclass}`}
                        id={`${btnclass}_true`}
                        variant="success" 
                        onClick={() => historySetter(`${path}=${true}`, path, `${btnclass}_true`, btnclass)}
                        >
                        {'True'}
                    </Button>
                </Col>
                <Col xs={6} className='column-class'>
                    <Button className={`buttonClass ${btnclass}`}
                        id={`${btnclass}_false`}
                        variant="success" 
                        onClick={() => historySetter(`${path}=${false}`, path, `${btnclass}_false`, btnclass)}
                        >
                        {'False'}
                    </Button>
                </Col>
            </>
        );
    }

    function renderLaunchYear() {
        return(
            <Row>
            {launch_years.map((item, idx) => {
            return (
                <Col xs={6} key={`${item}_idx`}>
                    <Button className="buttonClass btnyear" 
                        id={`${item}_idx`}
                        variant="success"
                        onClick={() => historySetter(`launch_year=${item}`, "launch_year", `${item}_idx`, "btnyear")}
                        >
                        {item}
                    </Button>
                </Col> 
                )           
            })}                   
        </Row>
        )
    }

    function renderButtonsFilter() {
        return (
            <>
            <Row>
                {button_getter('launch_success', 'btnlaunch')}
            </Row>
                <TextField data={config.land} />
            <Row className = 'rowBottom'>
                {button_getter('land_success', 'btnland')}
            </Row>
            </>
        )
    }
    function setFilterHtml(){
        return (
            <>
            <Row>
                <Col>
                    <Row className='filter-text'>{config.filters}</Row>                    
                       <TextField textId={'launchNo'} data={config.year} />    
                       {renderLaunchYear()}                 
                   
                </Col>
            </Row>   
                <TextField data={config.launch} />

                {renderButtonsFilter()}
            </>
        )
    }

    return(
        <div className="conr-class">
            {setFilterHtml()}
            
        </div>             
    );
}

export default Filters;
