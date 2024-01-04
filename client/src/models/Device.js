export class Device{
  constructor(data){
    this.id = data.id,
    this.is_active = data.is_active,
    this.name = data.name,
    this.type = data.type,
    this.volume_percent = data.volume_percent
  }
}