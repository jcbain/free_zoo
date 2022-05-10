rebuild: cat dog rand

cat:
	docker build -t free_zoo/cats -f cats/Dockerfile .

dog:
	docker build -t free_zoo/cats -f cats/Dockerfile .

rand:
	docker build -t free_zoo/cats -f cats/Dockerfile .


