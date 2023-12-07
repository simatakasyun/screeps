var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        for (var name in harvesters) {
            if (creep == harvesters[name]) {
                var TarToHar = name;
            }
        }

        //没有能量的时候去采集能量
        if (creep.memory.status == 0) {
            var sources = creep.room.find(FIND_SOURCES);

            if (creep.memory.id == 0) {
                var TarToHarvest = Game.getObjectById('5bbca9ea9099fc012e630598');
            }
            else if (creep.memory.id == 1) {
                var TarToHarvest = Game.getObjectById('5bbca9ea9099fc012e630597');
            }

            if (creep.harvest(TarToHarvest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(TarToHarvest, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.status = 1;
            }
        }
        else if (creep.memory.id == 0) {
            if (creep.carry.energy == 0) {
                creep.memory.status = 0;
            }
            //创建需要采集的地点
            var storages = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_STORAGE
                    )
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            var bases = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION
                        || structure.structureType == STRUCTURE_SPAWN
                        //                        || structure.structureType == STRUCTURE_CONTAINER
                    )
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (bases.length > 0) {
                if (creep.transfer(bases[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(bases[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            else {
                if (creep.transfer(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storages[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else if (creep.memory.id == 1) {
            if (creep.carry.energy == 0) {
                creep.memory.status = 0;
            }

            var link = Game.getObjectById('6478bf3c35bf6c9a491146da');
            if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
}

module.exports = roleHarvester;