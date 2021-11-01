function getPermissionLevel(member){
    var userroles = member.roles;
    if(userroles.cache.some(r=> r.name == "Vice Chief of Staff") || userroles.cache.some(r=> r.name == "Chief of Staff") || userroles.cache.some(r=> r.name == "Speaker of the Senate") || userroles.cache.some(r=> r.name == "Vice Chairman") || userroles.cache.some(r=> r.name == "Grand Marshal") || userroles.cache.some(r=> r.name == "Supreme Commander") || userroles.cache.some(r=> r.name == "Supreme Chancellor")){
        return 2;
    }else if(userroles.cache.some(r=> r.name == "Administrative Permissions")){
        return 1;
    }else{
        return 0;
    }
}

module.exports.getPermissionLevel = getPermissionLevel;