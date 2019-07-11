export interface ITaskScheduler {

    readonly id: string;  
    
    readonly repeatEach: number;  
    
    readonly intervalTime: string;  
    
    readonly monthOption: string;  
    
    readonly monday: number;  
    
    readonly tuesday: number;  
    
    readonly wednesday: number;  
    
    readonly thursday: number;  
    
    readonly friday: number;  
    
    readonly saturday: number;  
    
    readonly sunday: number;  
    
    readonly finish: string;    
    
    readonly finishDate: Date;  
    
    readonly finishAfterRepetitions: number;  
    
    readonly repetitions: number;

    readonly createdAt: Date;

    readonly updatedAt: Date;
}