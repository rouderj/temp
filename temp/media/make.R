drawTilt=function(innerDeg=0,outerDeg=20,contrast=.2,N=300,drawSurround=TRUE){
  par(mar=c(0,0,0,0),xaxs='i',yaxs='i',pty='s')
  
  X=matrix(rep(0:(N-1),each=N),nrow=N); Y=matrix(rep(0:(N-1),N),nrow=N)
  r=sqrt((X-N/2)^2 + (Y-N/2)^2)
  phase=0
  freq=15
  angle=pi+pi/180*outerDeg
  img1=contrast*sin(freq*2*pi/N*(X*cos(angle)+Y*sin(angle))-phase)
  angle=pi+pi/180*innerDeg
  img2=contrast*sin(freq*2*pi/N*(X*cos(angle)+Y*sin(angle))-phase)
  
  if(drawSurround==TRUE){
    img=img1
    img[r<(N/5)] = img2[r<(N/5)]
    img[r>(N/2)] = 0
  } else{
    img=img2
    img[r>(N/5)] = 0
  }
  img=(img+1)/2
  plot(0,t='n',xlim=c(0,1),ylim=c(0,1),axes=F,xlab="",ylab="")
  rasterImage(img,0,0,1,1,0)
}

## Make Figs ##
par(mfrow=c(1,1))
N=300
targs=seq(-10,10,1)
surrounds=c(-20,20)

for(s in surrounds){
  for(t in targs){
    
    png(paste('Surround',s,'Target',t,'.png',sep=''),width=N,height=N)
    drawTilt(t,s,.1)
    dev.off()
    
  }}