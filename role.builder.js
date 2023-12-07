var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //当为建造，但没有能量的时候，身份切换为采集
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        //当不为建造，但有能量的时候，身份切换为建造
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }
        //当为创建的时候
        if (creep.memory.building == true) {
            //查询所有的创建工地
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);


            if (targets.length) {
                //当有工地创建的时候，则移动建造，visualizePathStyle（可以标识路径）
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else {
            //否则执行采集任务

//            var sources = creep.room.find(FIND_STRUCTURES,
//                {
//                    filter: { structureType: STRUCTURE_CONTAINER }
//                });

//            sources.sort((b, a) => (a.store.getUsedCapacity(RESOURCE_ENERGY)) - (b.store.getUsedCapacity(RESOURCE_ENERGY)));
//            if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                creep.moveTo(sources[0]);
//            }

            var sources = creep.room.find(FIND_STRUCTURES,
                {
                    filter: { structureType: STRUCTURE_STORAGE }
                });

                if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }

//            var sources = creep.room.find(FIND_SOURCES);
//            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
//            }
        }

    }
}


module.exports = roleBuilder;