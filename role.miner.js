var roleMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {

        //没有能量的时候去采集能量
        if (creep.memory.status == 0) {
            var TarToHarvest = Game.getObjectById('5bbcb10840062e4259e92a49');
            var RemainToGet = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (resource) => {
                    return (
                        resource.resourceType == RESOURCE_HYDROGEN
                    )
                }
            });

            if(RemainToGet.length){
                if (creep.pickup(RemainToGet[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(RemainToGet[0]);
                }
            }

            if (creep.harvest(TarToHarvest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(TarToHarvest, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
            if (creep.store.getUsedCapacity(RESOURCE_HYDROGEN) == creep.carryCapacity) {
                creep.memory.status = 1;
            }
        }
        else {
            if (creep.store.getUsedCapacity(RESOURCE_HYDROGEN) == 0) {
                creep.memory.status = 0;
            }
            //创建需要采集的地点
            var storages = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_TERMINAL
                    )
                        ;
                }
            });

            if (storages.length > 0) {
                if (creep.transfer(storages[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storages[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
}

module.exports = roleMiner;