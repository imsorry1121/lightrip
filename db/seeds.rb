# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# environment_seed_file = File.join(Rails.root, 'db', 'seeds', "#{Rails.env}.rb")

def seed_image(file_name)
	File.open("public/spots/#{file_name}.jpg").read
end

def seed_image_from_assets(file_name)
	File.open("app/assets/images/#{file_name}.jpg").read
end

spots = Spot.create([
	{name: '美麗華', opentime: '9:00', lat: '25.082837', lon: '121.557293', info: '擁有超大型摩天輪，絕佳的約會聖地', picture: seed_image_from_assets("1"), MinTime: "0", MaxTime: "0"}])
spots = Spot.create([{name: '臺北101', opentime: '9:00', lat: '25.033496', lon: '121.563863', info: '世界前五高樓，眺望臺北夜景最佳觀景檯', picture: seed_image_from_assets("2"), MinTime: "0", MaxTime: "0"}])
spots = Spot.create([{name: '大安森林公園', opentime: '9:00', lat: '25.030009', lon: '121.535848',info: '臺北最大綠地，交通便利', picture: seed_image_from_assets("3"), MinTime: "0", MaxTime: "0"}])


spot_list=[
	["美麗華", "9:00", "25.082837","121.557293", "擁有超大型摩天輪，絕佳的約會聖地"]
]