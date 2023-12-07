var roleEnergizer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //没有能量的时候去采集能量

        var energizers = _.filter(Game.creeps, (creep) => creep.memory.role == 'energizer');

//        for (var name in energizers) {
//            var TarToEng = 0;
//            if (creep == energizers[name]) {
//                TarToEng = name;
//            }
//        }

        if (creep.memory.id == 0)
            var TarToHar = Game.getObjectById('5bbca9ea9099fc012e630598');
        else if (creep.memory.id == 1)
            var TarToHar = Game.getObjectById('5bbca9ea9099fc012e630597');

        if (creep.memory.status == 0) {
            //var sources = creep.room.find(FIND_SOURCES);
            //if (creep.harvest(TarToHar) == ERR_NOT_IN_RANGE) {
            //    creep.moveTo(TarToHar, { visualizePathStyle: { stroke: '#ffaa00' } });
            //}

                        var sources = creep.room.find(FIND_STRUCTURES,
                            {
                                filter: { structureType: STRUCTURE_STORAGE }
                            });

                        if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[0]);
                        }

            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.status = 1;
            }
        }
        else {
            if (creep.carry.energy == 0) {
                creep.memory.status = 0;
            }
            //创建需要采集的地点
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_TOWER
                        //                        || structure.structureType == STRUCTURE_CONTAINER
                    )
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (targets.length > 0) {
                if(creep.memory.id == 0){
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            if(creep.memory.id == 1){
                if (creep.transfer(targets[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[1], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            }




            //            var sources = creep.room.find(FIND_STRUCTURES,
            //                {
            //                    filter: { structureType: STRUCTURE_CONTAINER }
            //                });


            //            sources.sort((b, a) => (a.store.getUsedCapacity(RESOURCE_ENERGY)) - (b.store.getUsedCapacity(RESOURCE_ENERGY)));
            //            if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //                creep.moveTo(sources[0]);
            //            }
        }
    }
};

module.exports = roleEnergizer;