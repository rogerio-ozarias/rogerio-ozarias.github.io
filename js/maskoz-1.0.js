(function($){
$.fn.maskoz = function(settings){          
    this.init = function($this){    
        var objectClass = this; 
        $($this).find("[class*='mask[']").each(function(){     
            var element = $(this);                                             
            var value = $(element).val();                                   
            var elementClass = $(element).attr("class");            
            var mask = ((elementClass.split("mask["))[1].split("]"))[0];                                                             
            var maskRequired = objectClass.requiredFields(mask);            
            mask = objectClass.replace(mask, "?", "");   
            var maskLength = mask.length;                        
            $(element).attr("maxlength", maskLength); 
            var value = $(element).val();                          
            var position = 0; 
            
            objectClass.appMask(element, mask, maskRequired); 
            value = $(element).val();                              
            if((mask.length != value.length) && (maskRequired.length != value.length)){                  
                $(this).val("");
            }  
        })                   
        $($this).find("[class*='mask[']").keydown(function(e){ 
            var element = $(this);                       
            var value = $(element).val();                                   
            var elementClass = $(element).attr("class");            
            var mask = ((elementClass.split("mask["))[1].split("]"))[0];                       
            var maskRequired = objectClass.requiredFields(mask);            
            mask = objectClass.replace(mask, "?", "");           
            var maskLength = mask.length;                        
            $(element).attr("maxlength", maskLength);   
            var position = $(element).val().length;
            
            // se conseguiu pegar a tecla pressionada
            if(e.key!= "Unidentified"){
                if((e.keyCode != 8) && (e.keyCode != 46)){  
                    // se o tamanho for menor que os campos obrigatorios
                    if(position < maskRequired.length){
                        var tmpMask = maskRequired;
                    }else{                                          
                        var tmpMask = mask;   
                        objectClass.appMask(element, mask, maskRequired);                       
                    }
                    if(!objectClass.keyMask(element, tmpMask, e.key)){
                        e.preventDefault();
                    }
                }
            }else{                    
                objectClass.appMask(element, mask, maskRequired);
            }                                    
        }).keyup(function(e){
            var element = $(this);                              
            var value = $(element).val();                                   
            var elementClass = $(element).attr("class");            
            var mask = ((elementClass.split("mask["))[1].split("]"))[0];                                                             
            var maskRequired = objectClass.requiredFields(mask);            
            mask = objectClass.replace(mask, "?", "");    
            var maskLength = mask.length;                        
            $(element).attr("maxlength", maskLength); 
            var value = $(this).val();                          
            var position = 0;                                     
            objectClass.appMask(element, mask, maskRequired);                
        }).blur(function(){
            var element = $(this);                              
            var value = $(element).val();                                   
            var elementClass = $(element).attr("class");            
            var mask = ((elementClass.split("mask["))[1].split("]"))[0];                                                             
            var maskRequired = objectClass.requiredFields(mask);            
            mask = objectClass.replace(mask, "?", "");   
            var maskLength = mask.length;                        
            $(element).attr("maxlength", maskLength); 
            var value = $(element).val();                          
            var position = 0; 
            
            objectClass.appMask(element, mask, maskRequired); 
            value = $(element).val();                              
            if((mask.length != value.length) && (maskRequired.length != value.length)){                  
                $(this).val("");
            }                
        });        
    }
    this.appMask = function(element, mask, maskRequired){
        var string = $(element).val();
        if(string.length > maskRequired.length){                    
            var value = "";
            $(element).val("");
            for(var i=0; i<string.length; i++){                     
                if(this.keyMask(element, mask, string[i])){
                    $(element).val($(element).val() + string[i]);    
                }                                     
            } 
        }else{
            var value = "";
            $(element).val("");
            for(var i=0; i<string.length; i++){                     
                if(this.keyMask(element, maskRequired, string[i])){
                    $(element).val($(element).val() + string[i]);    
                }                                     
            } 
        }                                  
    }    
    this.keyMask = function(element, mask, keyPress){                                     
        position = $(element).val().length;              
        if(position > 255)
            return false;
        switch(mask[position]){                 
            case '9':
                keyPress = parseInt(keyPress);
                if(isNaN(keyPress)){                            
                    return false;
                }else{
                    return true;
                }
            break;                                      
            default:                                            
                if(mask[position] != keyPress){                         
                    if(typeof mask[position] != "undefined"){                                                                                                                          
                        $(element).val($(element).val() + mask[position]);
                        return this.keyMask(element, mask, keyPress);                                                                                        
                    }else{
                        return false;
                    }
                }else{
                    return true;
                }
        }
        return false;
    }     
    this.replace = function(string, search, replace){
        var newstring = "";
        for(var i=0; i<string.length; i++){
            if(!(string[i] == search)){
                newstring+=string[i];
            }else{
                newstring+=replace;
            }
        }
        return newstring;
    }
    this.requiredFields = function(string){
        var newstring = "";
        for(var i=0; i<string.length; i++){
            if(string[i] != "?"){
                if(!(string[i+1] == "?")){
                    newstring+=string[i];
                }
            }
        }
        return newstring;
    }
    this.init($(this)); 
    return this;
}
})(jQuery);