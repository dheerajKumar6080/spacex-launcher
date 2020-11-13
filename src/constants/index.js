export const config = {
    enumYear: ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"],
    header: 'SpaceX Launch Programs',
    developer: 'Dheeraj Kumar',
    filters: 'Filters',
    year: 'Launch Year',
    launch: 'Successful Launch',
    land: 'Successful Landing',
    firsturl: 'https://api.spacexdata.com/v3/launches?limit=100',
    launchadress: 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success={isLaunch}',
    launch_landaddress: 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success={isLaunch}&land_success={isLand}',
    all: 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success={launchPresent}&land_success={landPresent}&launch_year={yearPresent}'
}

