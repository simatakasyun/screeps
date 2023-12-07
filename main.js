var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');
var roleEnergizer = require('role.energizer');
var rolePorter = require('role.porter');
var roleMiner = require('role.miner');
var roleTemporary = require('role.temporary');
var structureTower = require('structure.tower');
var structureLink = require('structure.link');

module.exports.loop = function () {
    // Your code goes here

    //清除掉已经gg的creep
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //使用炮塔

    var tower = Game.getObjectById('646067f695671c6986c7d91d');
    structureTower.run(tower);
    var tower = Game.getObjectById('6478e62b9ab9569503b5bdd7');
    structureTower.run(tower);

    //传输能量
    structureLink.run();

    //找出所有的采集者
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvestersCount = 4;
//    console.log('Harvesters: ' + harvesters.length);

    var HarNumFir = 0, HarNumSec = 0;
    for (var name in harvesters) {
        if (harvesters[name].memory.id == 0)
            HarNumFir++;
        else if (harvesters[name].memory.id == 1)
            HarNumSec++;
    }

    //当数量小于1的时候，开始生产采集者
    if (HarNumFir < 0.5 * harvestersCount) {
        var newName = 'Harvesters' + (Game.time % 100);
        console.log('Spawning new harvester: ' + newName);

        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'harvester', id: 0 } });
    }
    if (HarNumSec < 0.5 * harvestersCount) {
        var newName = 'Harvesters' + (Game.time % 100);
        console.log('Spawning new harvester: ' + newName);

        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'harvester', id: 1 } });
    }



    //找出所有的充能者
    var energizers = _.filter(Game.creeps, (creep) => creep.memory.role == 'energizer');
    var energizersCount = 2;
    var EngNumFir = 0, EngNumSec = 0;
    for (var name in energizers) {
        if (energizers[name].memory.id == 0)
            EngNumFir++;
        else if (energizers[name].memory.id == 1)
            EngNumSec++;
    }

//    console.log('Energizers: ' + energizers.length);
    //当数量小于2的时候，开始生产充能者
    if (EngNumFir < 0.5 * energizersCount && harvesters.length == harvestersCount) {
        var newName = 'Energizer' + (Game.time % 100);
        console.log('Spawning new energizer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE], newName,
            { memory: { role: 'energizer', id: 0 } });
    }
    if (EngNumSec < 0.5 * energizersCount && harvesters.length == harvestersCount) {
        var newName = 'Energizer' + (Game.time % 100);
        console.log('Spawning new energizer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'energizer', id: 1 } });
    }


    //找出所有的修理工
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
//    console.log('repairers: ' + repairers.length);
    //当数量小于1的时候，开始生产修理工
    if (repairers.length < 4 && harvesters.length == harvestersCount) {
        var newName = 'Repairer' + (Game.time % 100);
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'repairer' } });
    }

    //找出所有的建筑者
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //当数量小于1的时候，开始生产建筑者
    if (builders.length < 0 && harvesters.length == harvestersCount) {
        var newName = 'Builder' + (Game.time % 100);
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'builder' } });
    }

    //找出所有的升级者
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
//    console.log('Upgraders: ' + upgraders.length);
    //当数量小于2的时候，开始生产升级者
    if (upgraders.length < 1 && harvesters.length == harvestersCount) {
        var newName = 'Upgrader' + (Game.time % 100);
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'upgrader' } });
    }

    //找出所有的临时工
    var temporaries = _.filter(Game.creeps, (creep) => creep.memory.role == 'temporary');
//    console.log('Temporaries: ' + temporaries.length);
    //当数量小于1的时候，开始生产临时工
    if (temporaries.length < 0 && harvesters.length == harvestersCount) {
        var newName = 'Temporary' + (Game.time % 100);
        console.log('Spawning new temporary: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'temporary' } });
    }

    //找出所有的搬运工
    var porters = _.filter(Game.creeps, (creep) => creep.memory.role == 'porter');
//    console.log('Porters: ' + porters.length);
    //当数量小于1的时候，开始生产临时工
    if (porters.length < 1 && harvesters.length == harvestersCount) {
        var newName = 'Porter' + (Game.time % 100);
        console.log('Spawning new porter: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE], newName,
            { memory: { role: 'porter' } });
    }

    //找出所有的矿工
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
//    console.log('Miners: ' + porters.length);
    //当数量小于1的时候，开始生产矿工
    if (miners.length < 0 && harvesters.length == harvestersCount) {
        var newName = 'Miner' + (Game.time % 100);
        console.log('Spawning new Miner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'miner' } });
    }



    //正在孵化进行的处理
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        //screeps则进行各自操作
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'energizer') {
            roleEnergizer.run(creep);
        }
        if (creep.memory.role == 'temporary') {
            roleTemporary.run(creep);
        }
        if (creep.memory.role == 'porter') {
            rolePorter.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
    }
}