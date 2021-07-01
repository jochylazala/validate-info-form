const path = require('path');
const pool = require('../database');
const check = require('./check.js');
const controller = {};
//routes
controller.index = (req, res) => {
	res.sendFile(path.join(__dirname,'../public/index.html'))
} 

controller.in =  (req, res) => {
	check.Data().then((result) =>{
		var userData = Object.values(JSON.parse(JSON.stringify(result)))
		const { name, email } = req.body;
		const newuser = {
			name,
			email
	};

	class User{
		constructor(emailTyped, milisecond, daysElapsed, days, missingDay,hours,minutes,seconds,mili,second_date){
			this.emailTyped = emailTyped;
			this.milisecond = milisecond;
			this.daysElapsed = daysElapsed;
			this.days = days;
			this.missingDay = missingDay;
			this.hours = hours;
			this.minutes = minutes;
			this.seconds = seconds;
			this.mili = mili;
			this.second_date = second_date;
		}

		get miliDay(){
			return this.time();
		}

		time(){
			return this.milisecond = this.hours * this.minutes * this.seconds * this.mili;
		}
	}
	
	let data = new User(newuser.email,0,0,0,0,24,60,60,1000, new Date());
	
	
	function Check_Data(typeEmail){
		return typeEmail.email === data.emailTyped;
	}
	let foundData = userData.find(Check_Data);
	console.log(foundData)

	let first_date;

	function DeleteUser(){
		pool.query('delete from usuario where id =?',[foundData.id]);

	}

	class Cal{

		get Show_result(){
			return this.result();
		}

		result(){
			first_date = new Date(foundData.firstDate);
			data.daysElapsed = Math.abs(first_date.getTime() - data.second_date.getTime());
			data.days = Math.round(data.daysElapsed / data.miliDay);
			return data.days;
		}

		get Missing_Day(){
			return this.missing();
		}

		missing(){
			return 	data.missingDay  = Math.abs(data.days - 60);
		}
	}
	let Days = new Cal();

	
	if(foundData === undefined){
		pool.query('INSERT INTO usuario set ?', [newuser]);
		res.sendFile(path.join(__dirname,'../public/second.html'))

	}else{
		update();
	}

	function update(){
		 if(foundData.email == data.emailTyped && Days.Show_result > 60 ){	
			pool.query('INSERT INTO usuario set ?', [newuser]);
			res.sendFile(path.join(__dirname,'../public/second.html'))
			DeleteUser();
		
		}else{
			res.send("Debes de esperar para volverlo a intentar" + " " + Days.Missing_Day + " " + "dias");

		}

	}

	});

};
   
controller.second = (req, res) => {
	res.sendFile(path.join(__dirname,'../public/second.html'));
}

module.exports = controller;