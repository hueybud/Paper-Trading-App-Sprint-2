var portfolioModel = require('../models/PortfolioModel');

async function setup() {
    await portfolioModel.removePortfolio(300);
}

setup()

/*
    Testing the getPortfolio() function
*/

test('get a valid portfolio', async function(){
    var result = await portfolioModel.getPortfolio(1);
    expect(typeof result).toBe("object");
    expect(typeof result.stocks).toBe("object");
})

test('get an invalid portfolio', async function(){
    var result = await portfolioModel.getPortfolio(300);
    expect(typeof result).toBe("undefined");
})

/*
    Testing the getPortfolioTickers() function
*/

test('get a valid portfolios tickers', async function(){
    var result = await portfolioModel.getPortfolioTickers(1);
    expect(typeof result).toBe("object");
})

test('get an invalid portfolios tickers', async function(){
    var result = await portfolioModel.getPortfolioTickers(300);
    expect(typeof result).toBe("undefined");
})

/*
    Testing the addPortfolio() function
*/

test('add a portfolio that does not exist yet', async function(){
    var result = await portfolioModel.addPortfolio(300);
    var doesPortfolioExsit = await portfolioModel.getPortfolio(300);
    expect(result).toBe("portfolio added");
    expect(doesPortfolioExsit).not.toBe(undefined);
})

test('add a portfolio that already exists', async function(){
    var result = await portfolioModel.addPortfolio(300);
    var doesPortfolioExsit = await portfolioModel.getPortfolio(300);
    expect(result).toBe("portfolio already exists");
    expect(typeof doesPortfolioExsit).toBe("object");
})


/*
    Testing the removePortfolio() function
*/

test('remove a portfolio that does not exist yet', async function(){
    var result = await portfolioModel.removePortfolio(301)
    expect(result.deletedCount).toBe(0);
})

test('remove a portfolio that does exist', async function(){
    var result = await portfolioModel.removePortfolio(300)
    expect(result.deletedCount).toBe(1);
})